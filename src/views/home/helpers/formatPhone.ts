export function formatPhoneLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
