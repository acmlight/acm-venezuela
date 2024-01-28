const formatDate = (timestamp) => {
    if(timestamp){
        const fecha = new Date(timestamp);
        const dateString = fecha.toLocaleDateString("es-ES", {
            month: "long", // numeric, 2-digit, narrow, long
            day: "numeric" // 2-digit
        });
        return dateString
    }else{
        return null
    }

}

export default formatDate;