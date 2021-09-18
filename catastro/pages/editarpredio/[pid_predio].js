import { useRouter } from "next/router";
import React from "react";

const EditarPredio = () => {

    //obtener ID actual

    const router = useRouter ();
    const {query : {pid_predio}} = router;
    console.log(pid_predio)

    return (
        <h1>Desde editar</h1>
    );
}

export default EditarPredio;