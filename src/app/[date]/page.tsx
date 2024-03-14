import { DetailPage } from "./DetailPage";

export default function Date({
  params: { date },
}: {
  params: { date: string };
}) {
  return <DetailPage date={date} />;
}
