package com.example.demo.Model;
import jakarta.persistence.*;

@Entity
@Table(name ="valid_file_type")
public class ValidFileType {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "valid_file_type_id")
    private long id;

    @Column(name = "type")
    private String type_name;

    //Constructor
    public ValidFileType(long id, String type_name) {
        this.id = id;
        this.type_name = type_name;
    }

    public  ValidFileType(){}

    //Getter and Setter

    public long getId() {
        return id;
    }

    public String getType_name() {
        return type_name;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setType_name(String type_name) {
        this.type_name = type_name;
    }
}
