export default async function getData(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("error. try again");
    }
    const data = await res.json();

    return data;
  } catch (err) {
    return err;
  }
}
