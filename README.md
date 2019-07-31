# genesys-cli

The genesys-cli is a cross-platform starting point for creating and configuring [Genesys 2](https://github.com/ngodn/genesys) projects, providing a simple boilerplate generator and wrapping other useful functions into an easy to use command line tool.

First, install genesys-cli as a global NPM module:
```bash
npm install -g genesys-cli
```

To view the available commands in a given context, execute the newly-installed command with no arguments:
```bash
genesys
```

#### Create a project

To create a new project with the tool:
```bash
genesys create-project <shortname-without-spaces>
```

This will create a local copy of our standard [Genesys Boilerplate](https://github.com/ngodn/genesys-boilerplate).

If you run the `create-project` command with the `--setup` flag, the command will also `npm install` the dependencies for the project and run `genesys-users:add` to create an admin user for the CMS, resulting in a fully bootstrapped project. This command will prompt you for a password for the admin user being created.

#### Create a widget
To bootstrap the necessary files and basic configuration for a new Genesys widget, run the following command from within your Genesys project's root directory:
```bash
# "-widgets" will automatically be appended to the end of your module name
genesys create-widget fancy-button
```

#### Create a piece
To bootstrap the necessary files and basic configuration for a new Genesys piece type, run the following command from within your Genesys project's root directory:
```bash
# be sure to use the SINGULAR version of the name of your content type
genesys create-piece vegetable
```

If you run the `create-piece` command with the `--pages` flag, the command will also set up a corresponding pieces-pages module with your new piece type. Similarly, you can run the `create-piece` command with the `--widgets` flag, which will also set up a corresponding pieces-widgets module along with your new piece type. These flags can be used together or separately.

```bash
genesys create-piece vegetable --pages --widgets
```

#### Create an empty Genesys module
To bootstrap the necessary files and basic configuration for a brand-new Genesys module that doesn't extend one of the usual suspects like pieces or widgets:
```bash
genesys create-module <module name>
```

#### Run other Genesys-flavored command-line tasks

To run an Genesys command-line task with the genesys-cli, which are conventionally run like this: `node app.js <namespace>:<task name>`, you may instead execute the following from any location within a project's directory:
```bash
genesys <namespace>:<task name>
```

The genesys-cli assumes the `genesys` namespace when executing tasks. This means that if a task is in the `genesys` namespace (such as the `genesys:reset` task), you can simply execute:
```bash
genesys <task name>
```

For more information on command-line tasks in Genesys, visit the [Command line tasks](#) documentation for Genesys.

---------------

For more documentation on Genesys, visit the [A2 documentation site](#).
