interface SectionUsProps {
  image: string;
  title: string;
  id: string;
}

function UsCard({ image, title }: SectionUsProps) {
  return (
    <div className="flex flex-col items-center justify-between rounded-2xl bg-primary p-4">
      <img src={image} alt={title} className="h-40" />
      <h3 className="text-tertiary text-2xl font-bold mt-4">{title}</h3>
    </div>
  )
}

export default UsCard