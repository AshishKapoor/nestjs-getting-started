import { SetMetadata } from '@nestjs/common';

// A "decorator factory" that attaches metadata (isPublic=true) to a route.
// Guards later read this metadata via the Reflector to decide whether to skip auth.
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
