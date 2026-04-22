import Studio from './Studio'

export const generateStaticParams = () => {
  return [{ tool: [] }]
}

export default function StudioPage() {
  return <Studio />
}
