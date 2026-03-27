package com.AML_3A.Rest_API.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.AML_3A.Rest_API.model.Student;
import com.AML_3A.Rest_API.service.StudentService;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Student> getStudents() {
        return service.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable int id) {
        return service.getStudentById(id);
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return service.saveStudent(student);
    }
}