import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'

const Sidebar =  () => {


    //routing de next
    const router = useRouter();

    return (

      <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
          <div>
              <p className="text-white text-2xl font-black">Base de datos catastro</p>
          </div>
          <nav className= "mt-5 list-none">
              <li className = {router.pathname === "/" ? "bg-blue-800 p-2" : "p-2"}>
                  <Link href="/">
                      <a className ="text-white mb-2 block"> 
                            Predios
                      </a>
                  </Link>
              </li>
              <li className = {router.pathname === "/propietarios" ? "bg-blue-800 p-2" : "p-2"}>
                  <Link href="/propietarios">
                    <a className ="text-white mb-2 block"> 
                            Propietarios
                      </a>
                  </Link>
              </li>
              <li className = {router.pathname === "/terreno" ? "bg-blue-800 p-2" : "p-2"}>
                  <Link href="/terreno">
                  <a className ="text-white mb-2 block"> 
                      Terrenos
                      </a>
                  </Link>
              </li>
              <li className = {router.pathname === "/construcciones" ? "bg-blue-800 p-2" : "p-2"}>
                  <Link href="/construcciones">
                  <a className ="text-white mb-2 block"> 
                      Construcciones
                      </a>
                  </Link>
              </li>
              <li className = {router.pathname === "/NuevoPredio" ? "bg-blue-800 p-2" : "p-2"}>
                  <Link href="/NuevoPredio">
                  <a className ="text-white mb-2 block"> 
                      Nuevo Predio
                      </a>
                  </Link>
              </li>
          </nav>
      </aside>

      );

    }

export default Sidebar