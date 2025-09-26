import { formations as formationFallback, cursusList as cursusFallback } from "../data/content";

function slugify(text) {
        if (!text) return "";
        return text
                .toString()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
}

function parseMaybeJson(value) {
        if (typeof value !== "string") return value;
        const trimmed = value.trim();
        if (!trimmed) return value;
        try {
                return JSON.parse(trimmed);
        } catch (error) {
                return value;
        }
}

function toNumber(value) {
        const parsed = parseMaybeJson(value);
        if (parsed === null || parsed === undefined || parsed === "") return null;
        const number = Number(parsed);
        return Number.isFinite(number) ? number : null;
}

function ensureArray(value) {
        const parsed = parseMaybeJson(value);
        if (Array.isArray(parsed)) return parsed.filter((item) => item !== null && item !== undefined);
        if (parsed === null || parsed === undefined || parsed === "") return [];
        return [parsed];
}

function normalizeProgramme(modules) {
        return ensureArray(modules)
                .map((entry) => parseMaybeJson(entry))
                .filter((module) => module && typeof module === "object")
                .map((module) => ({
                        title: module.title ?? module.Title ?? module.name ?? "",
                        duration:
                                module.duration ?? module.Duration ?? module.duree ?? module.Duree ?? module.Durée ?? "",
                        objectives: ensureArray(module.objectives ?? module.Objectifs ?? module.objective ?? []),
                        exercises: ensureArray(module.exercises ?? module.Exercices ?? module.exercise ?? []),
                }))
                .filter((module) => module.title || module.duration || module.objectives.length || module.exercises.length);
}

function normalizeSessions(sessions) {
        return ensureArray(sessions)
                .map((entry) => parseMaybeJson(entry))
                .filter((session) => session && typeof session === "object")
                .map((session) => {
                        const rawPrice = toNumber(session.price ?? session.Price ?? session.tarif ?? session.Tarif);
                        return {
                                date: session.date ?? session.Date ?? session.start ?? "",
                                city: session.city ?? session.City ?? session.location ?? session.Lieu ?? "",
                                price: rawPrice,
                                link: session.link ?? session.Link ?? session.url ?? session.URL ?? "",
                        };
                })
                .filter((session) => session.date || session.city || session.link);
}

export function normalizeFormation(item) {
        if (!item) return null;
        const parsed = parseMaybeJson(item);
        if (Array.isArray(parsed)) {
                return normalizeFormation(parsed[0]);
        }
        if (!parsed || typeof parsed !== "object") return null;

        const title = parsed.title ?? parsed.Title ?? parsed.name ?? "";
        const computedSlug = slugify(title);
        const customId =
                parsed.customId ??
                parsed.slug ??
                parsed.Slug ??
                parsed.CustomId ??
                parsed.code ??
                parsed.Code ??
                parsed.id ??
                parsed._id ??
                computedSlug;
        const id = parsed.id ?? parsed._id ?? customId ?? computedSlug;

        return {
                id: id || computedSlug,
                customId: customId || computedSlug,
                title,
                tagline: parsed.tagline ?? parsed.Tagline ?? "",
                description: parsed.description ?? parsed.Description ?? "",
                image: parsed.image ?? parsed.Image ?? "",
                rating: toNumber(parsed.rating ?? parsed.Rating) ?? 0,
                duration: parsed.duration ?? parsed.Duration ?? "",
                code: parsed.code ?? parsed.Code ?? "",
                certification: parsed.certification ?? parsed.Certification ?? "",
                price: toNumber(parsed.price ?? parsed.Price),
                link: parsed.link ?? parsed.Link ?? "",
                pdf: parsed.pdf ?? parsed.Pdf ?? parsed.PDF ?? "",
                objectives: ensureArray(parsed.objectives ?? parsed.Objectifs ?? parsed.Objectives ?? []),
                audience: parsed.audience ?? parsed.Audience ?? "",
                prerequisites: ensureArray(parsed.prerequisites ?? parsed.Prérequis ?? parsed.PreRequis ?? []),
                modalities: (parsed.modalities ?? parsed.Modalités ?? parsed.Modalite ?? "").toString(),
                programme: normalizeProgramme(parsed.programme ?? parsed.Program ?? parsed.Content ?? []),
                sessions: normalizeSessions(parsed.sessions ?? parsed.Sessions ?? []),
        };
}

export function normalizeCursus(item) {
        if (!item) return null;
        const parsed = parseMaybeJson(item);
        if (Array.isArray(parsed)) {
                return normalizeCursus(parsed[0]);
        }
        if (!parsed || typeof parsed !== "object") return null;

        const title = parsed.Title ?? parsed.title ?? parsed.name ?? "";
        const computedSlug = slugify(title);
        const customId =
                parsed.customId ?? parsed.slug ?? parsed.Slug ?? parsed.CustomId ?? parsed._id ?? parsed.id ?? computedSlug;
        const id = parsed._id ?? parsed.id ?? customId ?? computedSlug;

        return {
                id: id || computedSlug,
                customId: customId || id || computedSlug,
                title,
                tagline: parsed.tagline ?? parsed.Tagline ?? "",
                description: parsed.Description ?? parsed.description ?? "",
                rating: toNumber(parsed.Rating ?? parsed.rating) ?? 0,
                skills: ensureArray(parsed.Skills ?? parsed.skills ?? []),
                objectives: ensureArray(parsed.Objectifs ?? parsed.objectives ?? []),
                prerequisites: ensureArray(parsed.Prérequis ?? parsed.prerequisites ?? []),
                modalities: (parsed.Modalités ?? parsed.modalities ?? "").toString(),
                programme: normalizeProgramme(parsed.Content ?? parsed.programme ?? []),
                image: parsed.Image ?? parsed.image ?? "",
                sessions: normalizeSessions(parsed.sessions ?? parsed.Sessions ?? []),
        };
}

export function unwrapArray(payload) {
        const parsed = parseMaybeJson(payload);
        if (Array.isArray(parsed)) return parsed;
        if (parsed && typeof parsed === "object") {
                        if (Array.isArray(parsed.data)) return parsed.data;
                        if (Array.isArray(parsed.items)) return parsed.items;
                        if (Array.isArray(parsed.records)) return parsed.records;
                        if (parsed.data && typeof parsed.data === "object") return unwrapArray(parsed.data);
        }
        return parsed ? [parsed] : [];
}

export function buildEndpointWithId(template, id) {
        if (!template || !id) return template ?? "";
        return template
                .replace(/\{\{id\}\}/gi, id)
                .replace(/\{id\}/gi, id)
                .replace(/:id/gi, id);
}

export const FALLBACK_FORMATIONS = (formationFallback ?? [])
        .map((formation) => normalizeFormation(formation))
        .filter(Boolean);

export const FALLBACK_CURSUS = (cursusFallback ?? [])
        .map((cursus) => normalizeCursus(cursus))
        .filter(Boolean);

export function findFallbackFormation(customId) {
        if (!customId) return null;
        return FALLBACK_FORMATIONS.find(
                (formation) => formation.customId === customId || formation.id === customId
        ) ?? null;
}

export function findFallbackCursus(id) {
        if (!id) return null;
        return (
                FALLBACK_CURSUS.find((cursus) => cursus.id === id || cursus.customId === id) ?? null
        );
}
