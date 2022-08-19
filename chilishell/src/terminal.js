let functions = {
    clear: () => $("#terminalDisplay").html(""),
    welcome: () => {
        functions.clear();
        log(
            `
                          <span class="yellow">(</span>                       
   <span class="yellow">(       <span class="orange">)</span>     (      )\\ )    <span class="orange">)</span>       (   (</span>   
   <span class="orange">)\\   ( /( (   )\\ (  (()/( ( /(    (  )\\  )\\ \\</span> 
 <span class="dark-orange">(((_)  )\\()))\\ ((_))\\  /(_)))\\())  ))\\((_)((_)</span> 
&nbsp<span class="darker-orange">)\\</span><span class="red bold">___</span>&nbsp<span class="darker-orange">((_)\\((_)</span>&nbsp<span class="red bold">_</span>&nbsp<span class="darker-orange">((_)(_)) ((_)\\  /((_)</span><span class="red bold">_   _</span>   
<span class="darker-orange">((</span><span class="red bold">/ __|| |</span><span class="darker-orange">(_)(_)</span><span class="red bold">| | (_)/ __|| |</span><span class="darker-orange">(_)(_))</span><span class="red bold"> | | | |</span>  
 <span class="red bold">| (__ | ' \\ | || | | |\\__ \\| ' \\ / -_)| | | |</span>  
  <span class="red bold">\\___||_||_||_||_| |_||___/|_||_|\\___||_| |_|</span>

    run <span class="red bold">"help"</span> for a list of available commands
                        </pre>`,
            "terminal-header"
        );
    },
    my: (args) => {
        if (args.length === 1) {
            log("Please enter argument(s) for this command.");
            return;
        } else {
            args.forEach((arg, index) => {
                if (arg != "my" && contact[arg] !== undefined)
                    log(contact[arg]);
                else if (
                    arg === "-c" &&
                    contact[args[index - 1] + "Text"] !== undefined
                ) {
                    navigator.clipboard.writeText(
                        contact[args[index - 1] + "Text"]
                    );
                    log(`Copied ${args[index - 1]} to clipboard.`);
                } else if (
                    arg != "my" &&
                    contact[arg] === undefined &&
                    arg !== "-c"
                )
                    log(`Invalid arg "${arg}" ignored.`);
            });
        }
    },
    what: () => log("idk."),
    why: () => log("who knows?"),
    help: () =>
        log(`
    <span class="red">clear</span> - clear the console
    <span class="red">welcome</span> - display welcome message again
    <span class="red">what</span> - tells you what
    <span class="red">why</span> - tells you why
    <span class="red">my</span> - command for getting personal info
        # arg "email": get email
        # arg "phone": get phone number
        # arg "discord": get discord ID
        # flag "-c": copy the information before it
            % example: <span class="red">my email phone -c</span> copies phone
        % accepts multiple arguments
            % example: <span class="red">my email phone</span>
    <span class="red">echo</span> - print to terminal
        # arg: string to echo
	    % example: <span class="red">echo "hello!"</span>
	    % example: <span class="red">echo 'Hi!'</span>
    <span class="red">help</span> - display command list
    <span class="red">sl</span> - ;)`),
    sl: () => log("🚂"),
    echo: (args) => {
        if (!args.join(" ").includes("'") && !args.join(" ").includes('"'))
            return;
        log(
            args
                .join(" ")
                .replace("echo ", "")
                .split(
                    args.join(" ").includes('"')
                        ? '"'
                        : args.join(" ").includes("'")
                        ? "'"
                        : ""
                )
                .slice(1, -1)
        );
    },
};

let contact = {
    email: "<span class='green'>ahhmerrr.dev@gmail.com</span>",
    phone: "<span class='green'>(864)-508-1948</span>",
    discord: "<span class='green'>ahhmerrr@3430</span>",
    github: "<span class='green'>https://github.com/ahhmerrr</span>",

    emailText: "ahhmerrr.dev@gmail.com",
    phoneText: "8645081948",
    discordText: "ahhmerrr@3430",
    githubText: "ahhmerrr",
};

export function append(parent, children) {
    children.forEach((element) => {
        parent.append(element);
    });
}

export function appendSpan(parent, child, classes, styles) {
    $(parent).append(
        `<span ${styles === undefined ? "" : `style=${styles}`}
        ${
            classes === undefined ? "class='command-line'" : `class=${classes}`
        } >${child}</span>`
    );
}

export function appendPre(parent, child, classes, styles) {
    $(parent).append(
        `<pre ${styles === undefined ? "" : `style=${styles}`}
        ${
            classes === undefined ? "class='command-line'" : `class=${classes}`
        } >${child}</pre>`
    );
}

export function log(text, classes, styles) {
    appendPre("#terminalDisplay", text, classes, styles);
}

export function runCommand() {
    const command = $("#terminalInputText").val().split(" ");

    log(`🌶️ > ${command.join(" ")}`);

    if (command[0] === "") {
        return;
    } else if (functions[command[0]] == undefined) {
        log(
            `<span class='red bold'>ERR: invalid command "${command[0]}"</span>`
        );
        $("#terminalInputText").val("");
        return;
    }

    functions[command[0]](command);

    $("#terminalInputText").val("");
}
