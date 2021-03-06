# VSCode UI Scripting

This VSCode plugin aims to deliver a configurable UI context toolset that will allow quicker development within your team and projects.

## Scenarios

- If you need to create a custom scaffold for your project structure - creating a new component with a required set of sub elements etc.
- Generating a large set of objects or data based off of templates.
- and anything else you can think of.

## Demo

![Setup Configuration](images/Project%20Setup.gif)

You can also find a demo project that has implemented the vscode configs here:
https://github.com/druidworks/vscode-ui-scripting-example

### Configuration

You need to create a `vus-config.json` file in the root of the project.

it must list the commands you will be able to use later. here you will give your command a name you can reference later in an allowed commands config and a command that will be used to run after all inputs have been gathered. There is an optional property to customize how the command is laid out, and the default value is displayed in the `vus-config.json` example below using the `commandTemplate` property. We also provide the ability to disable the default inheritance of commands.

#### commandTemplate options

- "default" | undefined
- "baseCommandOnly"
- or a string template that contains one or more of the following:
  - "\<baseCommand>" - this is a required parameter.
  - "\<directoryContext>"
  - "\<answers>" - this is required if you have questions as part of your command.

#### inherit boolean

This property is true by default, and when disabled prevents this command from being used by sub directories of the vus-meta.json file - where it has been specified for use.

#### questions object

So each command can have a set of questions that will require input. As seen below you can have 3 variations:

- text input
- quick single pick
- quick multiselect (canPickMany boolean)

With regards to the quick pick options, if you specify the values field in a question it will automatically be converted to quick pick prompt. The detail field of the values will be used when calling the command you have designated.

If a user does not provide an answer for one of your questions it will default to `.`, but if you would like to specify something else, you just need to add `defaultAnswerValue` to your vus-config.json, see below. Spaces don't work so great when working with space sperated command line parameters ;)

#### vus-config.json example

```javascript
{
  "defaultAnswerValue": "-",
  "commands": [
    {
      "name": "addComponent",
      "command": "node index.js addComponent",
      "commandTemplate": "<baseCommand> <directoryContext> <answers>",
      "questions": [
        {
          "prompt": "What is your component name?",
          "placeholder": "Enter component name..."
        },
        {
          "prompt": "Select additional files to generate",
          "placeholder": "Select additional files to generate",
          "canPickMany": true,
          "values": [
            {
              "label": "styles.css",
              "Description": "Component CSS stylesheet",
              "detail": "styles.css"
            },
            {
              "label": "README.md",
              "Description": "Component README.md",
              "detail": "README.md"
            }
          ]
        }
      ]
    }
  ]
}
```

### Contextual Meta

Next you wil need to create `vus-meta.json` in the directories that you would like the context menu to have an effect, you can also drop the meta file in a parent directory to house all meta commands to be inherited by all sub directories of this file.

This meta file essentially controls what commands (found in your `vus-config.json` file) are allowed to run when you right click a file or folder in the VSCode explorer. You can prevent all of these commands from being inherited by sub directories of this file by adding the property `inherit` and setting it to false, as seen below.

```javascript
{
  "allowedDirectoryCommands": ["addComponent"],
  "allowedFileCommands": {
    "myComponent.js": ["processFile"]
  },
  "inherit": false
}
```

### Command Scripts

The final step would be write your scripts that you can call via the command field in your `vus-config.json` file. This can be anything you would run in the command line where you can pass parameters seperated by spaces.

**NB** - The first parameter of the commmand will always be the directory path you right clicked on or directory of the file you right clicked on. All other answers will follow and will be returned based on the order of your questions specified in the `vus-config.json`. The only time this will change is if you change the `commandTemplate` property of the command, see previous examples.

```javascript
npm run addComponent param1 param2
node index.js addComponent param1 param2
```
