export function updateCountdown() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeDiff = tomorrow - now;
    const hours = String(Math.floor((timeDiff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }