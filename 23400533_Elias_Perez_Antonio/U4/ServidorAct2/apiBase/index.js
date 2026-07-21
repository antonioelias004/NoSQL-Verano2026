const express = require("express");
const morgan=require("morgan");
const mongoose = require("mongoose")
const app =express();
app.use(express.json())
const PORT=3000;
mongoose.connect("mongodb://127.0.0.1:27017/escuela")
.then(()=>{
    console.log("conectado a mongo");
}).catch((error)=>{
    console.error("error al conectar con mongo",error);
});

const alumnoSchema = new mongoose.Schema(
    {
        nombre:{type:String,required:true,trim:true},
        carrera:{type:String,required:true,trim:true},
        semestre:{type:Number,requiered:true,min:1}

    },
    {
        timestamps:true
    }
);

const Alumno = mongoose.model("Alumno",alumnoSchema,"alumnos")
app.use(morgan("dev"));

app.get("/alumnos",async(req,res)=>{
    try{
        const alumnos=await Alumno.find();
        res.json(alumnos);

    }catch(error){
        res.status(500).json({
            mensaje:"error al obtener alumnos",
            error:error
        });
    }
});

let alumnos =[
    {
        id:1,
        nombre:"Antonio",
        carrera:"ISC",
        semestre:9,
    
    },
     {
        id:2,
        nombre:"Dabiela",
        carrera:"IM",
        semestre:9,
    
    }
]



app.get("/alumnos/:id",async(req,res)=>{
    try{
    const id=(req.params.id);
    const alumno= await Alumno.findById(id);
    if(!alumno){
        return res.status(404).json({
            mensaje:"alumno no encontrado"
        });
    }
    }catch(error){
        res.status(500).json({
            mensaje:"error al obtener alumno",
            error:error
        });
    }
});

app.post("/alumnos",async(req,res)=>{
    try{
    const{nombre,carrera,semestre}=req.body;
    if(!nombre || !carrera ||!semestre ){
        return res.status(400).json({
            mensaje:"faltan datos"
        });
    }
    const nuevoAlumno = new Alumno({
        nombre,carrera,semestre
    });
    const alumnoGuardado =await nuevoAlumno.save();
    res.json({
        mensaje:"alumno registrado correctamente",
        alumno:alumnoGuardado
    });
    }catch(error){
        res.status(500).json({
        mensaje:"error al guardar alumno",
        error:error
        })
    }
});

app.put("/alumnos/:id",async(req,res)=>{
    try{
        const id=(req.params.id);
         const{nombre,carrera,semestre}=req.body;

        if(!nombre || !carrera|| !semestre){
            return res.status(404).json({
                mensaje:"Faltan datos del estudiante"
            });
        }
       const alumnoActualizado=await Alumno.findByIdAndUpdate(
            id,
            {nombre,carrera,semestre},
            {new:true,runValidators:true}
       );
       if(!alumnoActualizado){
            return res.status(404).json({
                mensaje:"Alumno no encontrado"
            });
       }
        res.json({
            mensaje:"Alumno actualizado correctamente",
            alumno:alumnoActualizado
        });
    }catch(error){
        res.status(500).json({
            mensaje:"Error al agregar alumno",
            error:error
        });
    }
    
});

app.delete("/alumnos/:id",async (req,res)=>{
    try{
    const id=(req.params.id);
    const alumnoEliminado=await Alumno.findByIdAndDelete(
        id
    )
    if(!alumnoEliminado){
        return res.status(404).json({
            mensaje:"Alumno no encontrado"
        });
    }
    res.json({
        mensaje:"Alumno Eliminado correctamente",
        alumno:alumnoEliminado
    });
}catch(error){
        res.status(500).json({
            mensaje:"Error al eliminar alumno",
            error: error 
        });
    }
});

app.get("/",(req,res)=>{res.send("Servidor funcionando");
});
// numero par o impar
app.get("/par/:numero",(req,res)=>{
    const numero=parseInt(req.params.numero);
    if(numero %2 === 0){
        res.send(`el numero ${numero} es par`);
    }else{
        res.send(`el numero ${numero} es impar`);
    }
});

// mayor de edad 

app.get ("/edad/:edad",(req,res)=>{
    const edad=parseInt(req.params.edad);
    if(edad>=18){
        res.send(`eres mayor de edad`);
    }else{
        res.send(`eres menor de edad`);
    }
});

app.get("/calculadora/:operador/:a/:b",(req,res)=>{
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);
    const operador=(req.params.operador);

    if(operador === '+'){
        res.send(`la suma es de ${a+b}`);
    }else{
        if(operador === '-'){
            res.send(`la resta es de ${a-b}`);
        }else{
            if(operador === '/'){
                res.send(`la division es de ${a/b}`);
            }else{
                if(operador=== '*'){
                    res.send(`la multiplicacion es de ${a*b}`);
                }
            }
        }
    }
})

//tabla de multiplicar 

app.get("/tabla/:numero",(req,res)=>{
    const numero=parseInt(req.params.numero);
    let tabla="";
    for (let i = 0; i < 10+1; i++) {
        const R=parseInt(numero*i);
        tabla=numero*i;   
    }
    res.send(`${numero} x `)

});

// promedios
app.get("/calificacion/:nota",(req,res)=>{
    const nota=parseInt(req.params.nota);
    if(nota>=90){
        res.send("Exelente");
    }else{
        if(nota>=80){
            res.send("Muy bien");
        }else{
            if(nota >=70){
                res.send("Aprobado");
            } else{
                res.send("reprobado");
            }
        }
    }
})

app.listen(PORT,()=>{
console.log("Servidor iniciado en http://localhost:"+PORT);
})
