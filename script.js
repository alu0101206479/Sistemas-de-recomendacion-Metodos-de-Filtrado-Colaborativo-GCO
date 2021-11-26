var fichero = document.getElementById('fichero')
var matriz_entrada = []

fichero.addEventListener('change', function(e) {
  let reader = new FileReader();
  reader.onload = function () {
    let lines = reader.result.toString()
    let filas = lines.split("\n")

    filas.forEach((fila) => {
      matriz_entrada.push(fila.split(" "));
    })
  }
  reader.readAsText(fichero.files[0]);
}, false)



  function simple(matriz, item, n_vecinos, similitudes) {
    if (n_vecinos < 3) {
      alert("ERROR: EL número elegido de vecinos es demasiado pequeño para obtener predicciones con 'Predicción simple'");
    } else {

        let numerador = 0;
        let denominador = 0;    
        // let vecino = 0;   
        for (let k = 0; k < n_vecinos; k++) {
          // FALTA COMPROBAR EL ELSE, AQUI LO QUE PASA ES QUE SI ME FIJO EN LA VALORACIÓN DE OTRO USUARIO AL ITEM QUE QUIERO PREDECIR Y ESTA VALORACION ES NULA, PUES QUE HAGA ALGO
          //if (matriz[similitudes[vecino][0]][item] !== "-") {
            numerador = numerador + (similitudes[k][1]*parseInt(matriz[similitudes[k][0]][item]))
            denominador = denominador + Math.abs(similitudes[k][1],matriz[similitudes[3][0]][item])
          /*} else {
            vecino++
          }
          vecino++;*/
        }
        console.log(numerador, denominador, "HOLA", similitudes[3][1], )
        let resultado = numerador/denominador;

        return resultado;
    }
  }



  function medida(matriz, u, item, n_vecinos,  similitudes) {
    let numerador = 0;
    let denominador = 0;

    let vec_aux = matriz[u].filter(function(x) {
      return x !== "-";
    })

    let sumatorio_u = 0;
    for (let k = 0; k < vec_aux.length; k++) {
      sumatorio_u = sumatorio_u + parseInt(vec_aux[k])
    }

    let media_u = sumatorio_u/vec_aux.length

    for (let k = 0; k < n_vecinos; k++) {
      let vec_aux2 = matriz[similitudes[k][0]].filter(function(x) {
        return x !== "-";
      })

      let sumatorio_v = 0

      for (let l = 0; l < vec_aux2.length; l++) {
        sumatorio_v = sumatorio_v + parseInt(vec_aux2[l])
      }

      let media_v = sumatorio_v/vec_aux2.length

      // console.log(similitudes[k][0], matriz[similitudes[k][0]][item])
        // FALTA COMPROBAR EL ELSE, AQUI LO QUE PASA ES QUE SI ME FIJO EN LA VALORACIÓN DE OTRO USUARIO AL ITEM QUE QUIERO PREDECIR Y ESTA VALORACION ES NULA, PUES QUE HAGA ALGO
      // if (matriz[similitudes[k][0]][item] !== "-") {
        numerador = numerador + (similitudes[k][1] * (parseInt(matriz[similitudes[k][0]][item]) - media_v))
        denominador = denominador + Math.abs(similitudes[k][1])
      // }
    }

    let resultado = media_u + numerador/denominador

    return resultado;
  }



  function pearson(matriz, vecino1, vecino2) {
    let vec_aux = []

    for (let i = 0; i < matriz[vecino1].length; i++) {
      if (matriz[vecino1][i] !== "-" && matriz[vecino2][i] !== "-") {
        vec_aux.push(i)
      }
    }

    let media_v1 = 0
    let media_v2 = 0

    let sumatorio_v1 = 0
    let sumatorio_v2 = 0
    for (let i = 0; i < vec_aux.length; i++) {
      sumatorio_v1 = sumatorio_v1 + parseInt(matriz[vecino1][vec_aux[i]])
      sumatorio_v2 = sumatorio_v2 + parseInt(matriz[vecino2][vec_aux[i]])
    }

    media_v1 = sumatorio_v1/vec_aux.length
    media_v2 = sumatorio_v2/vec_aux.length

    let numerador = 0
    let den_1 = 0
    let den_2 = 0
    for (let i = 0; i < vec_aux.length; i++) {
      numerador = numerador + ((parseInt(matriz[vecino1][vec_aux[i]])-media_v1)*(parseInt(matriz[vecino2][vec_aux[i]])-media_v2))

      den_1 = den_1 + Math.pow(parseInt(matriz[vecino1][vec_aux[i]])-media_v1,2)
      den_2 = den_2 + Math.pow(parseInt(matriz[vecino2][vec_aux[i]])-media_v2,2)
    }

    den_1 = Math.sqrt(den_1)
    den_2 = Math.sqrt(den_2)
    let denominador = den_1*den_2

    let resultado = parseFloat((numerador/denominador).toFixed(2))

    return resultado

  }



  function coseno(matriz, vecino1, vecino2) {
    let vec_aux = []
    for (let i = 0; i < matriz[vecino1].length; i++) {
      if (matriz[vecino1][i] != "-" && matriz[vecino2][i] != "-") {
        vec_aux.push(i)
      }
    }

    let numerador = 0
    let den_1 = 0
    let den_2 = 0
    for (let i = 0; i < vec_aux.length; i++) {
      numerador = numerador+(parseInt(matriz[vecino1][vec_aux[i]])*parseInt(matriz[vecino2][vec_aux[i]]))

      den_1 = den_1+Math.pow(parseInt(matriz[vecino1][vec_aux[i]]), 2)
      den_2 = den_2+Math.pow(parseInt(matriz[vecino2][vec_aux[i]]), 2)
    }

    den_1 = Math.sqrt(den_1)
    den_2 = Math.sqrt(den_2)
    let denominador = den_1*den_2

    let resultado = parseFloat((numerador/denominador).toFixed(2))

    return resultado
  }



  // HAY ALGO MAL CUANDO SE HACE DUSTANCIA EUCLIDEA PREDICCION SIMPLE 5 VECINOS
  function euclidea(matriz, vecino1, vecino2) {
    let vec_aux = []
    for (let i = 0; i < matriz[vecino1].length; i++) {
      if (matriz[vecino1][i] !== "-" && matriz[vecino2][i] !== "-") {
        vec_aux.push(i)
      }
    }
    
    let resultado = 0
    for (let i = 0; i < vec_aux.length; i++) {
      console.log(resultado)
      resultado = resultado+Math.pow((parseInt(matriz[vecino1][vec_aux[i]])-parseInt(matriz[vecino2][vec_aux[i]])), 2)
    }

    resultado = parseFloat(Math.sqrt(resultado).toFixed(2))

    return resultado
  }



  function completarrrrrrr_matriz(matriz, metrica, n_vecinos, tipo_pred) {
    let hola = [[1, 2], [1, 3], [4, 5]]
    let i = JSON.parse(JSON.stringify(hola));

    console.log(JSON.parse(JSON.stringify(matriz)))

    
    i[0][1] = 75
    
    console.log(hola) // [1,2,3]
    console.log(i) // [4,2,3]
  }


  
  function completar_matriz(matriz, metrica, n_vecinos, tipo_pred) {
    let matriz_salida = JSON.parse(JSON.stringify(matriz));
    let similiaridades = [];
    let vecinos_seleccionados = [];
    let calculo_predicciones = [];

    for (let i = 0; i < matriz_salida.length; i++) {
      for (let j = 0; j < matriz_salida.length; j++) {
        if (i !== j) {
          let indice = 0;
          switch (metrica) {
            case "Correlación de Pearson":
              indice = similiaridades.findIndex((elemento) => {
                if (elemento[0] === i) {
                  return true;
                }
              })

              if (indice === -1) {
                similiaridades.push([i, [[j, pearson(matriz_salida, i, j)]]]);
              } else {
                similiaridades[indice][1].push([j, pearson(matriz_salida, i, j)])
              }
              
              break
            case "Distancia coseno":
              indice = similiaridades.findIndex((elemento, indice) => {
                if (elemento[0] === i) {
                  return true;
                }
              })

              if (indice === -1) {
                similiaridades.push([i, [[j, coseno(matriz_salida, i, j)]]]);
              } else {
                similiaridades[indice][1].push([j, coseno(matriz_salida, i, j)])
              }
              break
            case "Distancia Euclídea":
              indice = similiaridades.findIndex((elemento, indice) => {
                if (elemento[0] === i) {
                  return true;
                }
              })

              if (indice === -1) {
                similiaridades.push([i, [[j, euclidea(matriz_salida, i, j)]]]);
              } else {
                similiaridades[indice][1].push([j, euclidea(matriz_salida, i, j)])
              }
              break
            case "default":
                console.error("ERROR: No se ha proporcionado ninguna metrica valida")
                console.log("Metricas validas = [pearson, coseno, euclidea]")
              break
          }
        }
      }
    }



    //completarrrrrrr_matriz(matriz, metrica, n_vecinos, tipo_pred)

    for (let i = 0; i < matriz_salida.length; i++) {
      for (let j = 0; j < matriz_salida[i].length; j++) {
        if (matriz_salida[i][j] == "-") {

          let indice = similiaridades.findIndex((elemento) => {
            if (elemento[0] === i) {
              return true;
            }
          })

          let simil_vecinos = JSON.parse(JSON.stringify(similiaridades[indice][1]));

          switch (metrica) {
            case "Correlación de Pearson":
              simil_vecinos.sort(function (a, b) {
                if (a[2] > b[2]) {
                  return -1;
                } else {
                    if (a[2] < b[2]) {
                      return 1;
                    } else {
                        return 0;
                      }
                  }
              });
            break
            case "Distancia coseno":
              for (let k = 1; k < matriz_salida.length; k++) {
                simil_vecinos.sort(function (a, b) {
                  if (a[2] > b[2]) {
                    return -1;
                  } else {
                      if (a[2] < b[2]) {
                        return 1;
                      } else {
                          return 0;
                        }
                    }
                })
              }
              break
            case "Distancia Euclídea":
              simil_vecinos.sort(function (a, b) {
                if (a[2] < b[2]) {
                  return -1;
                } else {
                    if (a[2] > b[2]) {
                      return 1;
                    } else {
                        return 0;
                      }
                  }
              });
              break
            case "default":
                console.error("ERROR: No se ha proporcionado ninguna metrica valida")
                console.log("Metricas validas = [pearson, coseno, euclidea]")
              break
          }


          let aux = [i, j, []]
          let prediccion = 0
          switch (tipo_pred) {
            case "Predicción simple":
              for (let k = 0; k < n_vecinos; k++) {
                // Con este if me aseguro de que cuando se vaya a hacer la predicción no comprobemos un vecino que tampoco haya valorado ese item, se pasaria al siguiente vecino más cercano
                if (matriz_salida[simil_vecinos[k][0]][j] == "-") {
                  simil_vecinos.splice(k, 1);
                  k--;
                  continue;

                }

                aux[2].push(simil_vecinos[k][0]);
              }
              
              prediccion = simple(matriz_salida, j, n_vecinos, simil_vecinos)

              calculo_predicciones.push([i, j, prediccion])
              matriz_salida[i][j] = parseInt(prediccion).toFixed();
    
              break

            case "Diferencia con la medida":
              for (let k = 0; k < n_vecinos; k++) {
                if (matriz_salida[simil_vecinos[k][0]][j] == "-") {
                  simil_vecinos.splice(k, 1);
                  k--;
                  continue;
                }
                aux[2].push(simil_vecinos[k][0]);
              }

              prediccion = medida(matriz_salida, i, j, n_vecinos, simil_vecinos)
              calculo_predicciones.push([i, j, prediccion])
              matriz_salida[i][j] = parseInt(prediccion).toFixed();
              break
            case "default":
                console.error("ERROR: No se ha proporcionado ninguna metrica valida")
                console.log("Metricas validas = [pearson, coseno, euclidea]")
              break
          }
          
          vecinos_seleccionados.push(aux);
        }
      }
    }
    
    return [matriz_salida, similiaridades, vecinos_seleccionados, calculo_predicciones];
  }

  function recoger_informacion() {

    if (matriz_entrada.length == 0) {
      alert("La matriz no se ha podido procesar correctamente");
    } else {
        metrica = document.getElementById("metrica").value
        numero_vecinos = document.getElementById("numero_vecinos").value
        tipo_prediccion = document.getElementById("tipo_prediccion").value

        let salida = "<b>Matriz completa</b><br>"
        let salida_syr = completar_matriz(matriz_entrada, metrica, numero_vecinos, tipo_prediccion)

        for (let i = 0; i < salida_syr[0].length; i++) {
          for (let j = 0; j < salida_syr[0][i].length; j++) {
            if (j > 0) {
              salida = salida + " " + salida_syr[0][i][j]
            } else {
              salida = salida + salida_syr[0][i][j];
            }
          }
          salida = salida + "<br>"
        }

        salida = salida + "<br><br><b>Similiaridad entre cada usuario y sus vecinos de acuerdo a la métrica '" + metrica + "'</b><br>"
        
        for (let i = 0; i < salida_syr[1].length; i++) {
          salida = salida + "· Usuario " + parseInt(salida_syr[1][i][0]) + ":"
          for (let j = 0; j < salida_syr[1][i][1].length; j++) {
            salida = salida + "<br>Usuario " + salida_syr[1][i][0] + " - Usuario " + salida_syr[1][i][1][j][0] + ": <b>" + salida_syr[1][i][1][j][1] + "</b>"
          }
          salida = salida + "<br>"
        }
        
        salida = salida + "<br><br><b>Vecinos seleccionados en el proceso de predicción</b><br>"
        console.log(salida_syr[2])
        for (let i = 0; i < salida_syr[2].length; i++) {
          salida = salida + "· Predicción de la calificación Usuario " + (parseInt(salida_syr[2][i][0])+1) + "- Item " + (parseInt(salida_syr[2][i][1])+1) + "):<br>Usuarios "
          for (let j = 0; j < salida_syr[2][i][2].length; j++) {
            if (j > 0) {
              if (j == salida_syr[2][i][2].length-1) {
                salida = salida + " y <b>" + (parseInt(salida_syr[2][i][2][j])+1) + "</b>"
              } else {
                salida = salida + ", <b>" + (parseInt(salida_syr[2][i][2][j])+1) + "</b>"
              }
            } else {
              salida = salida + "<b>" + (parseInt(salida_syr[2][i][2][j])+1) + "</b>"
            }
          }
          salida = salida + "<br>"
        }

        salida = salida + "<br><br><b>Cálculo de cada predicción de la matriz de utilidad en base a los vecinos seleccionados</b><br>"
        console.log(salida_syr[2])
        for (let i = 0; i < salida_syr[3].length; i++) {
          salida = salida + "· Predicción de la calificación Usuario " + (parseInt(salida_syr[3][i][0])+1) + "- Item " + (parseInt(salida_syr[3][i][1])+1) + ": <b>" + salida_syr[3][i][2] + "<br>"
        }

        salida = salida + "<br><br>"
        document.getElementById("salida").innerHTML = salida
    }
  }

