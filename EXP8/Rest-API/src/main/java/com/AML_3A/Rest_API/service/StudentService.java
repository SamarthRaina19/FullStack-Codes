package com.AML_3A.Rest_API.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.AML_3A.Rest_API.model.Student;

@Service
public class StudentService {

    private List<Student> students = new ArrayList<>();

    // Get all students
    public List<Student> getAllStudents() {
        return students;
    }

    // Get student by ID
    public Student getStudentById(int id) {
        return students.stream()
                .filter(s -> s.getId() == id)
                .findFirst()
                .orElse(null);
    }

    // Add student
    public Student saveStudent(Student student) {
        students.add(student);
        return student;
    }

// UPDATE student
public Student updateStudent(int id, Student updatedStudent) {
    for (Student s : students) {
        if (s.getId() == id) {
            s.setName(updatedStudent.getName());
            s.setCourse(updatedStudent.getCourse());
            return s;
        }
    }
    return null;
}

// DELETE student
public String deleteStudent(int id) {
    boolean removed = students.removeIf(s -> s.getId() == id);
    return removed ? "Deleted Successfully" : "Student Not Found";
}
}