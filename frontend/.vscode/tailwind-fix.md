## TAILWIND VSCODE WARNING FIX

- This folder is a workaround for a problem with Tailwind CSS IntelliSense in VSCode.
- Create a VSCode settings file in this folder (.vscode/settings.json) with the following content:

```json
{
  "css.customData": [".vscode/tailwind.json"]
}
```

- Then, create another file in this folder (.vscode/tailwind.json) with the following content:

```json
{
  "version": 1,
  "atDirectives": [
    {
      "name": "@tailwind",
      "description": "Use the `@tailwind` directive to insert Tailwind's `base`, `components`, `utilities` and `screens` styles into your CSS.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#tailwind"
        }
      ]
    }
  ]
}
```

- You need to add as many directives as you have Tailwind CSS files in your project.
- Finally, restart VSCode.

### This should fix the problem.
