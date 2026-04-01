class Course:
    def __init__(self, student_id: int, name: str):
        self.student_id = student_id
        self.name = name


class Student:
    def __init__(self, id: int, first_name: str, last_name: str, age: int):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.courses = []

    def __str__(self):
        courses_str = ", ".join(self.courses)
        return f"{self.first_name} {self.last_name} ({self.age} lat): {courses_str}"
    
students = []

with open("students.txt", "r", encoding="utf-8") as file:
    for line in file:
        dane = line.strip().split(",")
        student = Student(
            int(dane[0]),
            dane[1],
            dane[2],
            int(dane[3])
        )
        students.append(student)
courses = []

with open("courses.txt", "r", encoding="utf-8") as file:
    for line in file:
        dane = line.strip().split(",")
        course = Course(
            int(dane[0]),
            dane[1]
        )
        courses.append(course)
for student in students:
    for course in courses:
        if student.id == course.student_id:
            student.courses.append(course.name)
for student in students:
    print(student)
for student in students:
    filename = f"{student.first_name.lower()}_{student.last_name.lower()}.txt"

    with open(filename, "w", encoding="utf-8") as file:
        file.write("Kursy:\n")
        for course in student.courses:
            file.write(f" - {course}\n")