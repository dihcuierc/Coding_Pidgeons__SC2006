export default function calculateAge(dob) {
    let diff = new Date(Date.now() - Date.parse(dob));
    let age = new Date(diff);
    return Math.abs(age.getUTCFullYear() - 1970);
}