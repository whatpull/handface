# Third-party Icon Licenses

## Heroicons (HandRaised)

- **Source**: https://github.com/tailwindlabs/heroicons
- **Specific file**: [`optimized/24/solid/hand-raised.svg`](https://github.com/tailwindlabs/heroicons/blob/master/optimized/24/solid/hand-raised.svg)
- **License**: MIT
- **Original copyright**: Tailwind Labs Inc.
- **License text**: https://github.com/tailwindlabs/heroicons/blob/master/LICENSE

### Used in

- `src/app/icon.svg` (favicon)
- `src/components/handface-logo.tsx` (HandFace inline brand logo)

### Modifications

The original 24×24 single-color path is mounted inside a 32×32 viewBox via
`<g transform="translate(4 4)">` over a brand-yellow background circle
(`#FFD21E`), and rendered in brand-brown (`#3a2a1a`). The path data itself is
unmodified.

### MIT License (verbatim)

```
MIT License

Copyright (c) 2020 Refactoring UI Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
