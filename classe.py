class MyClass:
	def __init__(self, attribute1, attribute2):
		self.attribute1 = attribute1
		self.attribute2 = attribute2

	def method1(self):
		# Implement method1 functionality here
		pass

	def method2(self):
		# Implement method2 functionality here
		pass

	def __str__(self):
		return f"MyClass(attribute1={self.attribute1}, attribute2={self.attribute2})"


# Instanciate the class

my_instance = MyClass("value1", "value2")

list_of_instances = []
list_of_instances.append(my_instance)
