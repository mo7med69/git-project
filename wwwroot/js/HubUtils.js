export  function keepAlive(connection, method, params) {
    try {
        if (params)
             connection.invoke(method, ...params);
        else
             connection.invoke(method);

    } catch (err) {
        console.error(err);
    }
}