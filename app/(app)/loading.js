import Spinner from "@/app/_components/Spinner";
// loading activities streaming which needs javascript turned on in the browser
export default function Loading() {
  return <Spinner />;
}
//  suspsense is not activated by react just by calling async
//  suspense depends on data fething  or lazy

// suspense boundary
// fiber tree (never destroyed)  Activity - mode visble hidden(state preserved as described)
//  suspsnse fallback, page trasnitions wont work unless key is provided

// suspsniondg child throws a promise
