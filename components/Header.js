import { Container, Text } from "@nextui-org/react";
import Link from "next/link";

export default function Header() {
  return (
    <Container as="header" responsive display="flex" justify="space-between">
      <div>
        <Text small>next<Text>Comic Jokes</Text></Text>
      </div>
      <nav>
        <Container as="ul" display="flex" direction="row" responsive>
          <li><Link href='/'>Home</Link></li>
        </Container>
      </nav>
    </Container>
  )
}
