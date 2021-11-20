class Cliente extends Persona{
    sexo = null;
    edad = null;

    constructor(sexo, edad){
        this.sexo = sexo||"";
        this.edad = edad||0;
    }

    toString(){
        var resultado = "ID: " + this.id + " Nombre: " + this.nombre + " Apellido: " + this.apellido + " Sexo: " + this.sexo + " Edad: " + this.edad;

        return resultado;
    }

    static PerteneceALaClase(dato){
        return (dato instanceof Cliente).toString();
    }

    SetearValores(id, nombre, apellido, sexo, edad){
        super.SetearValores(id, nombre, apellido);
        this.sexo = sexo;
        this.edad = edad;
    }

    static LastId = () => {
        /* var max = Math.max(...originalData.map(o=>o.id)); */
    
        var max = originalData.reduce(function (prev, curr) {
            return prev.id > curr.id ? prev : curr;
        });
    
        max.id++;
    
        return max.id;
    }
}