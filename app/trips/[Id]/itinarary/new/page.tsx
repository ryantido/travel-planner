import NewClientItinararyPage from "@/components/NewClientItinararyPage";

export default async function NewItinararyPage({ params }: { params: Promise<{ Id: string }>}) {
  const { Id } = await params;

  return <NewClientItinararyPage tripId={Id} />
}
