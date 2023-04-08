function calculateDate(timestamp) {
    const hr = new Date(timestamp).getHours();
    const min = new Date(timestamp).getMinutes();
    return (hr + ":" +  min);

}
function calculateAge(dob) {
    let diff = new Date(Date.now() - Date.parse(dob));
    let age = new Date(diff);
    return Math.abs(age.getUTCFullYear() - 1970);
}

function convertStringToDate(obj) {
    let [day,month,year] = obj.split('/');
    return new Date(year,month-1,day);
}

function convertTimeToTimeStamp(time, date) {
    let [day,month, year] = date.split('/');
    const [hour, min] = time.split(":");
    return new Date(year,month,day, hour,min).getTime();

}



export {calculateDate,calculateAge,convertStringToDate, convertTimeToTimeStamp}