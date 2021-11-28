const projectName = 'markdown';

marked.setOptions({  // marked for markdown format
    breaks:true,
    highlight: function(code){
        return Prism.highlight(code, Prism.languages.javascript, 'javascript'); // Prism for coloring code
    }
});

const renderer = new marked.Renderer();
renderer.link = function(href,title,text){
    return `<a target="_blank" title="${title}" href="${href}">${text}</a>`;
};

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            markdown: placeholder,
            editorMaximized:false,
            previewMaximized:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
        this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this)
    }
    handleChange(e){
        this.setState({
            markdown: e.target.value
        });
    }
    handleEditorMaximize(){
        this.setState({
            editorMaximized: !this.state.editorMaximized
        });
    }

    handlePreviewMaximize(){
        this.setState({
            previewMaximized: !this.state.previewMaximized
        });
    }

    render(){
        const classes = this.state.editorMaximized ?['editorWrap maximized','previewWrap hide','fa fa-compress']
        :this.state.previewMaximized
        ?['editorWrap hide','previewWrap maximized','fa fa-compress']
        :['editorWrap','previewWrap','fa fa-arrows-alt'];

        return(
            <div>
                <div className = {classes[0]}>

                    <Toolbar
                        icon={classes[2]}
                        onClick={this.handleEditorMaximize}
                        text="Editor"
                    />

                    <Editor
                        markdown={this.state.markdown} onChange={this.handleChange}
                    />
                </div>

                <div className="converter" />

                <div className = {classes[1]}>
                    
                    <Toolbar
                        icon={classes[2]}
                        onClick={this.handlePreviewMaximize}
                        text="Previewer"
                    />
                    <Preview markdown={this.state.markdown} />
                </div>
            </div>
        );
    }
}

const Toolbar = (props) =>{
    return(
        <div className="toolbar">
            <i className="fa fa-free-code-camp" title="no-stack-dub-sack" />
            {props.text}
            <i className={props.icon} onClick={props.onClick}/>
        </div>
    );
};

const Editor = (props) =>{
    return(
        <textarea 
        id="editor"
        onChange={props.onChange}
        type="text"
        value={props.markdown}
        />
    );
};

const Preview = (props) =>{
    return(
        <div
            dangerouslySetInnerHTML= {{
                __html: marked(props.markdown,{renderer:renderer})
            }}
            id= "preview"
        /> 
    );
};

// below the content: https://markdown-it.github.io/
const placeholder = `
# Welcome to my React Markdown Previewer!

---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered


+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa




## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins


[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

`;

ReactDOM.render(<App />,document.getElementById('app'));