export function ajax(props) {
    const {
        url,
        method = "GET", // Método predeterminado GET
        headers = {},    // Encabezados opcionales
        body,            // Cuerpo opcional (para POST, PUT, etc.)
        callBackSuccess, // Función de éxito
        callBackError,   // Función opcional de manejo de errores
    } = props;

    // Configuración de la solicitud
    const fetchOptions = {
        method,
        headers: {
            "Content-Type": "application/json", // Encabezado predeterminado
            ...headers, // Agregar encabezados personalizados
        },
        ...(body && { body: JSON.stringify(body) }), // Incluir cuerpo si existe
    };

    fetch(url, fetchOptions)
        .then((res) => {
            if (!res.ok) {
                // Si no es una respuesta correcta, rechaza la promesa
                return Promise.reject({
                    status: res.status,
                    statusText: res.statusText || "Error desconocido",
                });
            }
            return res.json(); // Devuelve el JSON si la respuesta es correcta
        })
        .then((json) => callBackSuccess(json)) // Llama a la función de éxito
        .catch((error) => {
            if (callBackError) {
                callBackError(error); // Maneja errores si se proporciona un callback
            } else {
                console.error("Error en la solicitud AJAX:", error); // Registro en consola
            }
        });
}
