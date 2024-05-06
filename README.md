# Pxldrop

## Running the Projects
To run the API:

```bash
nx serve api
```

To run the frontend:

```bash
nx serve frontend
```

To run e2e tests for the API:
```bash
nx e2e api-e2e
```

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Workspace setup:

The following commands were used to generate this template. You don't need to run these commands again, as the generated files are already included in the repository. These instructions are for reference purposes.

1. Update the Nx CLI globally:

   ```bash
   npm install -g nx@latest
   ```

2. Create a new Nx workspace:

   ```bash
   npx create-nx-workspace@latest pxldrop --preset=empty --packageManager=yarn
   ```

3. Change to the workspace directory:

   ```bash
   cd pxldrop
   ```

4. Update to use yarn2

   ```bash
   yarn set version berry
   ```

5. Add Nest.js support to the workspace:

   ```bash
   yarn add -D @nrwl/nest
   ```

6. Create a new Nest.js API:

   ```bash
   nx g @nrwl/nest:application api
   ```

7. Create a new React frontend with Vite:

   ```bash
   nx g @nx/react:app frontend --bundler=vite
   ```

8. Create a shared-types library:

   ```bash
   nx g @nrwl/js:library shared-types
   ```

   Choose tsc as the library builder when prompted.

9. Create a custom eslint rule
   ```bash
   nx g @nx/linter:workspace-rule custom-rule
   ```

