class Persona {
    id = null;
    nombre = null;
    apellido = null;

    constructor(id, nombre, apellido) {
        this.id = id || 0;
        this.nombre = nombre || "";
        this.apellido = apellido || "";
    }

    get id() {
        return this.id;
    }

    set id(valor) {
        this.id = valor;
    }

    get nombre() {
        return this.nombre;
    }

    set nombre(valor) {
        this.nombre = valor;
    }

    get apellido() {
        return this.apellido;
    }

    set apellido(valor) {
        this.apellido = valor;
    }

    SetearValores(id, nombre, apellido) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
    }


}