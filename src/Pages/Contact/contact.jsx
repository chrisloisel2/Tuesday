import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import axios from "axios";

function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      setStatus("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/contact", {
        name,
        email,
        subject,
        message,
      });
      if (response.status === 200) {
        setStatus("Votre message a été envoyé avec succès.");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setStatus("Erreur lors de l'envoi du message.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto flex flex-col items-center justify-center space-y-20 pl-12 pr-12"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]"
      >
        Contactez nous
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-xl text-[#E8F9FF] max-w-4xl mx-auto"
      >
        Vous avez des questions, souhaitez collaborer ou en savoir plus sur nos
        formations ? Remplissez le formulaire ci-dessous, nous vous répondrons
        dans les plus brefs délais.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="bg-[#4AB3E2] bg-opacity-10 p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto space-y-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <motion.div
            whileFocus={{ scale: 1.05 }}
            className="flex flex-col relative"
          >
            <FaUser className="absolute top-4 left-4 text-[#AEEFFF] text-xl" />
            <input
              type="text"
              placeholder="Votre nom"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-12 p-4 rounded-lg bg-[#1A2B3C] text-[#E8F9FF] placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#AEEFFF] transition"
            />
          </motion.div>
          <motion.div
            whileFocus={{ scale: 1.05 }}
            className="flex flex-col relative"
          >
            <FaEnvelope className="absolute top-4 left-4 text-[#AEEFFF] text-xl" />
            <input
              type="email"
              placeholder="Votre adresse email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 p-4 rounded-lg bg-[#1A2B3C] text-[#E8F9FF] placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#AEEFFF] transition"
            />
          </motion.div>
        </div>
        <motion.div
          whileFocus={{ scale: 1.05 }}
          className="flex flex-col relative"
        >
          <FaCommentDots className="absolute top-4 left-4 text-[#AEEFFF] text-xl" />
          <input
            type="text"
            placeholder="Objet de votre message"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="pl-12 p-4 rounded-lg bg-[#1A2B3C] text-[#E8F9FF] placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#AEEFFF] transition"
          />
        </motion.div>
        <motion.div
          whileFocus={{ scale: 1.05 }}
          className="flex flex-col relative"
        >
          <textarea
            rows="5"
            placeholder="Votre message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-4 rounded-lg bg-[#1A2B3C] text-[#E8F9FF] placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#AEEFFF] transition"
          ></textarea>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button className="bg-[#AEEFFF] text-[#1A2B3C] rounded-3xl px-16 py-5 text-xl shadow-2xl hover:bg-[#E8F9FF] transition">
            Envoyer
          </Button>
        </motion.div>
        {status && <p className="text-center mt-4">{status}</p>}
      </motion.form>
    </motion.section>
  );
}

export default ContactSection;
