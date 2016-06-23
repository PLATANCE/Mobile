export function commaPrice(price, suffix) {
	const priceString = String(price);
  const commaedPrice = priceString.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  return `${commaedPrice}${suffix}`;
}