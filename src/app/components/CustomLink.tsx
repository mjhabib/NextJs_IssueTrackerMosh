import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';

interface Props {
  href: string;
  children: string;
}

export default function CustomLink({ href, children }: Props) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
}

// We created this custom link component so we can have a consistent styled in our project.
// If we use the Link component from Next, we need to style it whenever we use it,
// If we use the Link from Radix, we lose the React Rendering feature, so we combined the two to a custom one!
