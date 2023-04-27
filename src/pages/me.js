import { useSession } from "next-auth/react"
import Layout from "@/modules/layout/components"

export default function MePage() {
  const { data: session } = useSession()

  return (
    <Layout>
     
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </Layout>
  )
}