export function formatDate(date?: Date) {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function getAgeGroup(birthDateStr: string): string {
  const [day, month, year] = birthDateStr.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  console.log(age)
  
  
  const m = today.getMonth() - birthDate.getMonth();
  
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age >= 10 && age <= 15) return "CHILDREN";
  if (age >= 16 && age <= 25) return "TEENS";
  if (age >= 26 && age <= 50) return "ADULTS";
  if (age > 50) return "SENIORS";
  throw new Error("Age out of supported range");
}
