package com.example.demo.Model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "printing_system")
public class PrintingSystem {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "system_id")
    private Long id;

    @OneToMany
    @JoinColumn(name = "list_printer")
    private List<Printer> printers;

    @OneToMany
    @JoinColumn(name = "list_printLogs")
    private List<PrintLog> printLogs;

    public PrintingSystem(Long id, List<Printer> printers, List<PrintLog> printLogs) {
        this.id = id;
        this.printers = printers;
        this.printLogs = printLogs;
    }

    public PrintingSystem() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Printer> getPrinters() {
        return printers;
    }

    public void setPrinters(List<Printer> printers) {
        this.printers = printers;
    }

    public List<PrintLog> getPrintLogs() {
        return printLogs;
    }

    public void setPrintLogs(List<PrintLog> printLogs) {
        this.printLogs = printLogs;
    }
}
