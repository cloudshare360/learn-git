const q = (prompt, options, answer, explanation, hint, alternate) => ({ prompt, options, answer, explanation, hint, alternate });
const cmd = (goal, variants, explanation, output = '') => ({ goal, variants, explanation, output });
const mistake = (symptom, cause, recovery) => ({ symptom, cause, recovery });

export const shellOptions = {
  windows: [
    { value: 'powershell', label: 'PowerShell' },
    { value: 'cmd', label: 'Command Prompt' },
    { value: 'gitbash', label: 'Git Bash' }
  ],
  macos: [{ value: 'zsh', label: 'Terminal (zsh)' }],
  linux: [{ value: 'bash', label: 'Terminal (bash)' }]
};

export const glossary = {
  argument: 'Extra information given to a command, such as a filename.',
  branch: 'A movable label for one line of development.',
  browser: 'An application that requests and displays websites.',
  cli: 'A command-line interface: a way to control software by typing commands.',
  commit: 'A recorded project snapshot with an author, time, and message.',
  continuous_integration: 'Automated checks that validate changes when defined repository events occur.',
  directory: 'Another word for a folder.',
  dns: 'The Domain Name System, which maps human-readable domains to hosting destinations.',
  environment: 'A place where software runs, such as testing or production.',
  extension: 'The ending of a filename, such as .txt or .html, that helps identify its type.',
  git: 'Version-control software that records project history.',
  github: 'An online hosting and collaboration service for Git repositories.',
  markdown: 'Readable plain text that uses symbols to describe formatting.',
  path: 'A written address that identifies a file or folder.',
  pull_request: 'A GitHub proposal to review and merge one branch into another.',
  remote: 'A saved name and URL for another Git repository location.',
  repository: 'A project folder and the Git history recorded for it.',
  shell: 'The program that reads terminal commands, such as PowerShell, bash, or zsh.',
  staging: 'Git’s preparation area for choosing the exact changes in the next commit.',
  tag: 'A stable name attached to a specific commit, commonly used for releases.',
  terminal: 'A text-based application used to interact with a shell.',
  version_control: 'A system that records changes so history can be compared, shared, and recovered.'
};

const common = {
  prerequisites: [],
  terms: [],
  explanation: [],
  steps: [],
  commands: [],
  expected: '',
  practice: '',
  mistakes: [],
  visual: { type: 'flow', title: 'Lesson path', nodes: ['Learn', 'Practice', 'Check'], alt: 'Learn the idea, practice it, and check understanding.' }
};

const L = (lesson) => ({ ...common, ...lesson });

export const course = [
  {
    id: 'start', number: '0', title: 'Start here', description: 'Use the course safely and learn basic computer actions.',
    lessons: [
      L({
        id: 'welcome', title: 'Welcome: zero knowledge assumed', duration: 8,
        outcome: 'Identify instructions, buttons, commands, output, and placeholders without risking your computer.',
        terms: ['browser', 'terminal', 'shell'],
        explanation: [
          'This course assumes you have never written code or used a terminal. Every unfamiliar word is defined when it first appears.',
          'A command is text you intentionally give to a shell. Output is the shell’s response. Never type the example prompt symbol, and never paste a command you do not understand.',
          'Text such as <your-name> is a placeholder. Replace it—including the angle brackets—with your own safe value.'
        ],
        steps: [
          { title: 'Choose your system', body: 'Use the System menu at the top. Windows learners can also choose PowerShell, Command Prompt, or Git Bash.' },
          { title: 'Read command cards', body: 'The dark box is input. The Expected result area is output and must not be pasted back into the terminal.' },
          { title: 'Use the course tree', body: 'Expand a module on the left, select a lesson, then use Previous and Next in the lesson.' },
          { title: 'Practice common actions', body: 'Click once to select. Double-click usually opens. Right-click opens a context menu. Ctrl+C/Ctrl+V copies and pastes on Windows/Linux; macOS uses Command+C/Command+V.' }
        ],
        expected: 'You can identify your operating system, active shell, current lesson, and the difference between a command and its output.',
        practice: 'Select your operating system, change the color theme, expand this module, and return to this lesson.',
        mistakes: [mistake('A command includes <your-name>.', 'The placeholder was copied literally.', 'Replace the complete placeholder with your value before running the command.')],
        visual: { type: 'orientation', title: 'The learning screen', nodes: ['Course tree', 'Lesson', 'Commands and help'], alt: 'The screen has course navigation on the left, the lesson in the center, and contextual tools on the right.' },
        quiz: q('Which text should you type into a terminal?', ['The command only', 'The command and expected output', 'The prompt symbol and command'], 0, 'Type only the command. Output is the computer’s response.', 'Look for the distinction between input and output.', 'If an example says <project-name>, what must you do?')
      }),
      L({
        id: 'safety', title: 'Safety, saving, and secrets', duration: 10,
        outcome: 'Recognize reversible actions, destructive actions, and information that must remain private.',
        terms: ['version_control'],
        explanation: [
          'Save writes your current work to a file. Undo reverses a recent edit inside an application. Recycle Bin or Trash may recover files deleted through a graphical file manager, but terminal deletion can bypass it.',
          'Passwords, personal access tokens, SSH private keys, recovery codes, and real .env values are secrets. Do not place them in screenshots, lessons, commits, or public repositories.',
          'Before a risky command, confirm the current folder, understand every option, and make sure important work is committed or backed up.'
        ],
        steps: [
          { title: 'Save deliberately', body: 'Use Ctrl+S on Windows/Linux or Command+S on macOS. Confirm the file name and location.' },
          { title: 'Treat deletion carefully', body: 'Graphical deletion and terminal deletion behave differently. This course labels destructive commands.' },
          { title: 'Keep secrets outside Git', body: 'Use environment files locally, ignore the real file, and commit only a safe .env.example with placeholder names.' }
        ],
        expected: 'You can explain why a terminal delete and a public Git commit require more care than an ordinary text edit.',
        practice: 'Write down three things you will never paste into a public repository.',
        mistakes: [mistake('A token was committed.', 'A secret was stored in a tracked file.', 'Revoke or rotate the token first. Removing a later commit is not enough because history may retain it.')],
        visual: { type: 'decision', title: 'Before a risky action', nodes: ['Check location', 'Understand action', 'Protect work', 'Proceed'], alt: 'Check the location and action, protect important work, then proceed.' },
        quiz: q('What is the first response to a committed access token?', ['Revoke or rotate the token', 'Delete the latest line only', 'Rename the file'], 0, 'Assume an exposed credential is compromised and revoke or rotate it first.', 'Deleting a line does not remove old history.', 'Is a terminal delete guaranteed to use Recycle Bin or Trash?')
      })
    ]
  },
  {
    id: 'computer-basics', number: '1', title: 'Files, folders & terminals', description: 'Learn where work lives and how to move around safely.',
    lessons: [
      L({
        id: 'files-folders', title: 'Files, folders, and paths', duration: 18,
        outcome: 'Create a three-level practice workspace and explain each part of its path.',
        terms: ['directory', 'extension', 'path'],
        explanation: [
          'A file stores information. A folder—also called a directory—organizes files and other folders. A path is the address of one item.',
          'Windows paths commonly start with a drive and use backslashes, for example C:\\Users\\Ava\\learn-git. macOS and Linux use forward slashes, for example /Users/ava/learn-git or /home/ava/learn-git.',
          'An absolute path starts from the drive or root. A relative path starts from your current folder. Filename extensions such as .txt, .md, and .html help identify file types.'
        ],
        steps: [
          { title: 'Open your file manager', body: 'Windows: open File Explorer from the folder icon. macOS: open Finder. Ubuntu: open Files.' },
          { title: 'Create the workspace', body: 'Open Documents. Use New folder and name it learn-git. Open it and create practice, then create notes inside practice.' },
          { title: 'Create a text file', body: 'Inside notes, create hello.txt. On Windows, enable View > Show > File name extensions so the file is not accidentally hello.txt.txt.' },
          { title: 'Read the location', body: 'Use the address bar or path breadcrumbs. Name the parent and child folders aloud.' }
        ],
        commands: [cmd('Create the folder tree in a terminal', {
          powershell: "New-Item -ItemType Directory -Path 'learn-git/practice/notes' -Force",
          cmd: 'mkdir learn-git\\practice\\notes', gitbash: 'mkdir -p learn-git/practice/notes', zsh: 'mkdir -p learn-git/practice/notes', bash: 'mkdir -p learn-git/practice/notes'
        }, 'mkdir means make directory. -p creates missing parent folders on Unix-style shells; PowerShell uses -Force for the same prepared example.', 'A learn-git folder containing practice, which contains notes.' )],
        expected: 'Documents contains learn-git/practice/notes/hello.txt, and filename extensions are visible.',
        practice: 'Create a sibling folder named images next to notes, rename it assets, then undo or rename it back to images.',
        mistakes: [mistake('The file appears as hello.txt.txt.', 'Windows hid the existing extension.', 'Enable file name extensions, then rename the file to exactly hello.txt.')],
        visual: { type: 'tree', title: 'Your first folder tree', nodes: ['Documents/', '  learn-git/', '    practice/', '      notes/', '        hello.txt'], alt: 'Documents contains learn-git, which contains practice, notes, and hello.txt.' },
        quiz: q('Which item is the parent of notes?', ['practice', 'hello.txt', 'learn-git/practice/notes'], 0, 'practice directly contains notes, so it is the parent.', 'Look one level above notes in the tree.', 'Is hello.txt a file or a folder?')
      }),
      L({
        id: 'file-manager', title: 'Navigate with Explorer, Finder, or Files', duration: 15,
        outcome: 'Move into, out of, and between folders using graphical controls.',
        prerequisites: ['files-folders'], terms: ['path'],
        explanation: [
          'The sidebar jumps to common locations. The address/path bar shows the current location. Breadcrumbs show each containing folder. Back returns through location history; Up or the parent breadcrumb moves to the containing folder.',
          'Downloads and Documents are different locations. Before saving or moving a file, read the full visible path.'
        ],
        steps: [
          { title: 'Enter a folder', body: 'From Documents, double-click learn-git, then practice, then notes.' },
          { title: 'Move to the parent', body: 'Choose the practice breadcrumb or the Up control. Confirm notes and images are visible.' },
          { title: 'Use Back and Forward', body: 'Use Back to revisit the prior location and Forward to return. These follow history; they do not always mean parent and child.' },
          { title: 'Copy and move safely', body: 'Copy hello.txt to practice, then move the copy into images. Confirm the original still exists before deleting the practice copy.' }
        ],
        expected: 'You can always point to the current path and return from notes to Documents without searching.',
        practice: 'Navigate Documents > learn-git > practice > images, then return to learn-git using breadcrumbs only.',
        mistakes: [mistake('A file seems lost after dragging.', 'It was moved rather than copied or dropped in another folder.', 'Use search by exact filename, inspect the result path, and move it deliberately.')],
        visual: { type: 'orientation', title: 'File manager landmarks', nodes: ['Sidebar', 'Back / Forward', 'Path breadcrumbs', 'Files area'], alt: 'A file manager has a sidebar, navigation controls, path breadcrumbs, and a main files area.' },
        quiz: q('What does the Back button normally do?', ['Return through location history', 'Always move to the parent folder', 'Delete the current folder'], 0, 'Back follows your navigation history. The parent breadcrumb moves up one level.', 'Back and Up are not always the same.', 'Which control reveals your current location?')
      }),
      L({
        id: 'terminal-navigation', title: 'Open a terminal and navigate', duration: 25,
        outcome: 'Use a terminal to identify and change the current folder with absolute and relative paths.',
        prerequisites: ['files-folders'], terms: ['terminal', 'shell', 'cli', 'argument'],
        explanation: [
          'A terminal is the window; a shell reads the commands. PowerShell, Command Prompt, Git Bash, zsh, and bash have overlapping but not identical commands.',
          'The current working directory is the folder where a command acts by default. Check it before creating, moving, or deleting anything.',
          'A single dot means the current folder. Two dots mean the parent. Tab completion finishes names and helps avoid typing errors. Up Arrow recalls earlier commands. Ctrl+C cancels a running command in most terminals; it does not copy there.'
        ],
        steps: [
          { title: 'Open the terminal', body: 'Windows: search for the selected shell. macOS: Applications > Utilities > Terminal. Ubuntu: open Terminal from Applications.' },
          { title: 'Print the location', body: 'Run the current-location command below. Read each folder segment.' },
          { title: 'List the folder', body: 'Run the list command. Compare it with the graphical file manager.' },
          { title: 'Navigate relatively', body: 'Move into Documents/learn-git/practice, list it, move into notes, then use cd .. to return.' },
          { title: 'Use quotes and Tab', body: 'Create or navigate to a practice folder with a space in its name using quotes. Type the first letters and press Tab.' }
        ],
        commands: [
          cmd('Show the current folder', { powershell: 'Get-Location', cmd: 'cd', gitbash: 'pwd', zsh: 'pwd', bash: 'pwd' }, 'The result is the absolute path of the terminal’s current folder.'),
          cmd('List visible contents', { powershell: 'Get-ChildItem', cmd: 'dir', gitbash: 'ls', zsh: 'ls', bash: 'ls' }, 'Listing does not change anything.'),
          cmd('Move to the parent folder', { powershell: 'Set-Location ..', cmd: 'cd ..', gitbash: 'cd ..', zsh: 'cd ..', bash: 'cd ..' }, 'Two dots identify the parent directory.')
        ],
        expected: 'The terminal path matches the graphical file manager path, and listing shows the same practice items.',
        practice: 'From learn-git, enter practice/notes using a relative path, return two levels, then enter it using its absolute path.',
        mistakes: [
          mistake('The shell reports that a path was not found.', 'The name, spacing, letter case, or starting folder differs.', 'Run the location and list commands, copy the exact visible name, and quote paths containing spaces.'),
          mistake('Ctrl+C did not copy terminal text.', 'In terminals Ctrl+C normally cancels.', 'Use the terminal’s context menu or Ctrl+Shift+C where supported.')
        ],
        visual: { type: 'path', title: 'Relative movement', nodes: ['learn-git', 'practice', 'notes', '.. returns to practice'], alt: 'From notes, two dots moves to its parent, practice.' },
        quiz: q('You are in learn-git/practice/notes. What does cd .. select?', ['learn-git/practice', 'learn-git', 'notes'], 0, 'Two dots means one parent level.', 'Move one level upward in the tree.', 'Which command tells you the current folder?')
      }),
      L({
        id: 'terminal-files', title: 'Create, read, copy, move, and remove files', duration: 28,
        outcome: 'Manage practice text files in each supported shell and explain output redirection.',
        prerequisites: ['terminal-navigation'], terms: ['extension'],
        explanation: [
          'Commands differ between shells. In Command Prompt, type displays a text file. PowerShell uses Get-Content and provides cat as an alias. Git Bash, macOS, and Linux provide the Unix cat program.',
          'The > operator replaces a file’s contents. The >> operator appends. Always inspect the destination before using either. Terminal removal may bypass Recycle Bin or Trash.'
        ],
        steps: [
          { title: 'Confirm location', body: 'Navigate to learn-git/practice/notes and list it.' },
          { title: 'Create and write', body: 'Create terminal-note.txt, then write “My first terminal file” to it.' },
          { title: 'Read and append', body: 'Display the file, append a second line with >>, and display it again.' },
          { title: 'Copy, move, rename', body: 'Copy the file into practice, rename the copy, then move it into images. Verify at each stage.' },
          { title: 'Remove only practice copies', body: 'Delete the deliberate copy after reading the current path and exact filename. Keep the original.' }
        ],
        commands: [
          cmd('Create an empty text file', { powershell: "New-Item 'terminal-note.txt'", cmd: 'type nul > terminal-note.txt', gitbash: 'touch terminal-note.txt', zsh: 'touch terminal-note.txt', bash: 'touch terminal-note.txt' }, 'Creates a file in the current folder.'),
          cmd('Write one line', { powershell: "'My first terminal file' | Set-Content 'terminal-note.txt'", cmd: 'echo My first terminal file>terminal-note.txt', gitbash: "echo 'My first terminal file' > terminal-note.txt", zsh: "echo 'My first terminal file' > terminal-note.txt", bash: "echo 'My first terminal file' > terminal-note.txt" }, 'A single > replaces existing content.'),
          cmd('Display the file', { powershell: "Get-Content 'terminal-note.txt'", cmd: 'type terminal-note.txt', gitbash: 'cat terminal-note.txt', zsh: 'cat terminal-note.txt', bash: 'cat terminal-note.txt' }, 'Reads text without changing it.', 'My first terminal file')
        ],
        expected: 'terminal-note.txt contains two lines and you can explain which command read it in your shell.',
        practice: 'Create checklist.txt with one item, append a second item, read it, and keep the file for later Git lessons.',
        mistakes: [mistake('Earlier text disappeared.', '> replaced the file instead of appending.', 'Use undo in an editor if still possible; otherwise recreate the practice content. Use >> when append is intended.')],
        visual: { type: 'flow', title: 'Safe file operation loop', nodes: ['Check path', 'Run one command', 'List/read result', 'Continue'], alt: 'Check location, perform one operation, verify the result, and only then continue.' },
        quiz: q('Which Windows Command Prompt command displays notes.txt?', ['type notes.txt', 'cat notes.txt', 'Get-Content notes.txt'], 0, 'Traditional Command Prompt uses type. Git Bash uses cat; PowerShell uses Get-Content or its cat alias.', 'Identify the selected Windows shell.', 'What is the important difference between > and >>?')
      })
    ]
  },
  {
    id: 'tools', number: '2', title: 'Install your tools', description: 'Prepare Git, GitHub, and VS Code safely.',
    lessons: [
      L({
        id: 'github-account', title: 'Create and secure a GitHub account', duration: 15,
        outcome: 'Create a durable public identity with recovery and privacy protections.',
        terms: ['github', 'repository'],
        explanation: ['GitHub hosts repositories and collaboration tools; it is not Git itself.', 'Choose a professional username you can keep. Verify your email, use a unique password, enable multi-factor authentication, and store recovery codes outside the repository.', 'Public repositories and profile activity can be visible worldwide. Use GitHub’s no-reply email option if you do not want a personal email in commits.'],
        steps: [
          { title: 'Open the official site', body: 'Type github.com into the browser address bar and confirm the domain before signing up.' },
          { title: 'Create and verify', body: 'Choose a username, use your password manager, complete verification, and verify the email message.' },
          { title: 'Secure recovery', body: 'Enable two-factor authentication and store recovery codes in a secure location that is not this course folder.' },
          { title: 'Review privacy', body: 'Choose email visibility and understand that public repositories are readable by anyone.' }
        ],
        expected: 'Your account is verified, protected by MFA, and has a deliberate email privacy setting.',
        practice: 'Sign out and confirm that your recovery method and password manager allow you to sign back in.',
        mistakes: [mistake('A recovery code was saved in the project.', 'Secret recovery material was placed in a future repository.', 'Move it to secure storage and remove the project copy before Git is initialized.')],
        visual: { type: 'flow', title: 'Account safety', nodes: ['Unique password', 'Verify email', 'Enable MFA', 'Store recovery codes'], alt: 'Protect the account using a unique password, verified email, multi-factor authentication, and securely stored recovery codes.' },
        quiz: q('Who can read a public repository?', ['Anyone on the internet', 'Only collaborators', 'Only people with Git installed'], 0, 'Public means its content can be read without collaborator access.', 'Think about the word public.', 'Where should recovery codes be stored?')
      }),
      L({
        id: 'install-git', title: 'Install Git and Unix tools', duration: 25,
        outcome: 'Install Git from an official source, select appropriate Windows options, and verify the executable.',
        terms: ['git', 'shell'],
        explanation: ['Git for Windows includes Git Bash and common Unix tools such as ls, cat, touch, grep, and ssh. PowerShell and Command Prompt remain available.', 'Installer screens change over time. Read each choice. Keep the bundled OpenSSH and credential manager unless your organization specifies otherwise. Choose an option that allows Git from the command line and third-party software.', 'Line endings differ: Windows commonly uses CRLF and Unix-like systems use LF. The installer’s recommended checkout/commit conversion is reasonable for beginners; later .gitattributes can make project policy explicit.'],
        steps: [
          { title: 'Download officially', body: 'Windows: git-scm.com. macOS: install Apple command-line tools when prompted by git --version or use an approved package manager. Ubuntu: use the distribution package manager.' },
          { title: 'Windows options', body: 'Include Git Bash, Git GUI, Unix tools, bundled OpenSSH, and Git Credential Manager. Keep main as the new default branch if offered.' },
          { title: 'Finish and reopen', body: 'Close old terminal windows, open the selected shell, and verify Git.' },
          { title: 'Verify Unix tools on Windows', body: 'Open Git Bash and run ls, cat --version, and ssh -V. These tools belong to the Git Bash environment.' }
        ],
        commands: [
          cmd('Verify Git', { powershell: 'git --version', cmd: 'git --version', gitbash: 'git --version', zsh: 'git --version', bash: 'git --version' }, 'Prints the installed Git version. Any supported version output confirms the shell can find Git.', 'git version 2.x.x'),
          cmd('Install on Ubuntu/Debian', { bash: 'sudo apt update\nsudo apt install git' }, 'Refreshes package information and installs Git. sudo may request your computer password.')
        ],
        expected: 'git --version succeeds in the intended shell. Windows learners can open Git Bash and use Unix-style tools.',
        practice: 'Record your Git version and active shell in learning-notes.md without recording private account data.',
        mistakes: [mistake('git is not recognized/found.', 'The terminal was open before installation, PATH was not selected, or installation failed.', 'Open a new terminal. If still failing, rerun the official installer and review the PATH option.')],
        visual: { type: 'flow', title: 'Installation path', nodes: ['Official source', 'Review options', 'Install', 'New terminal', 'git --version'], alt: 'Download from the official source, review options, install, open a new terminal, and verify the Git version.' },
        quiz: q('Where is the Unix cat program available on Windows after the recommended Git installation?', ['Git Bash', 'Only File Explorer', 'GitHub.com'], 0, 'Git for Windows provides Unix tools inside Git Bash.', 'Git Bash emulates a Unix-style shell environment.', 'Why should you reopen the terminal after installation?')
      }),
      L({
        id: 'configure-git', title: 'Configure identity and defaults', duration: 20,
        outcome: 'Set Git’s author identity, main default, and inspect where configuration values came from.',
        prerequisites: ['install-git'], terms: ['git', 'commit'],
        explanation: ['Git writes user.name and user.email into new commits; these values are authorship metadata, not your GitHub password.', 'Global configuration applies to your user account. Local configuration applies only to the current repository and overrides global values.', 'Use the same verified or GitHub no-reply email associated with your account if you want GitHub to connect commits to your profile.'],
        steps: [
          { title: 'Set identity', body: 'Replace the placeholders with the public name and verified/no-reply email you intend to attach to commits.' },
          { title: 'Set modern default', body: 'Configure new repositories to use main. Older repositories may still use master; always inspect the actual branch.' },
          { title: 'Inspect configuration', body: 'List values and their origin files. Do not edit the configuration file blindly.' },
          { title: 'Understand credentials', body: 'GitHub HTTPS authentication uses a browser/credential manager or token—not your account password at a terminal prompt.' }
        ],
        commands: [
          cmd('Set global author identity', { powershell: 'git config --global user.name "Your Name"\ngit config --global user.email "your-email@example.com"', cmd: 'git config --global user.name "Your Name"\ngit config --global user.email "your-email@example.com"', gitbash: 'git config --global user.name "Your Name"\ngit config --global user.email "your-email@example.com"', zsh: 'git config --global user.name "Your Name"\ngit config --global user.email "your-email@example.com"', bash: 'git config --global user.name "Your Name"\ngit config --global user.email "your-email@example.com"' }, 'Quotes preserve spaces in the name. Replace both examples.'),
          cmd('Use main for new repositories', { powershell: 'git config --global init.defaultBranch main', cmd: 'git config --global init.defaultBranch main', gitbash: 'git config --global init.defaultBranch main', zsh: 'git config --global init.defaultBranch main', bash: 'git config --global init.defaultBranch main' }, 'This affects future git init operations.'),
          cmd('Inspect values and sources', { powershell: 'git config --list --show-origin', cmd: 'git config --list --show-origin', gitbash: 'git config --list --show-origin', zsh: 'git config --list --show-origin', bash: 'git config --list --show-origin' }, 'Shows each effective setting and the file that supplied it.')
        ],
        expected: 'user.name, user.email, and init.defaultBranch are visible with their configuration source.',
        practice: 'Run git config --global --get user.email and confirm it is the intended public/no-reply address.',
        mistakes: [mistake('Commits show the wrong identity.', 'A global or repository-local value is incorrect.', 'Use --show-origin inside the repository, then update the correct scope before new commits.')],
        visual: { type: 'layers', title: 'Configuration scopes', nodes: ['System: every user', 'Global: your account', 'Local: current repository', 'Closest scope wins'], alt: 'System configuration is broad, global applies to one user, and local applies to one repository and overrides broader values.' },
        quiz: q('Does user.email store your GitHub password?', ['No, it is commit authorship metadata', 'Yes', 'Only on Windows'], 0, 'Git records the configured email in commit metadata. Authentication credentials are separate.', 'Identity and authentication are different.', 'Which configuration scope affects only the current repository?')
      }),
      L({
        id: 'install-vscode', title: 'Install and orient yourself in VS Code', duration: 25,
        outcome: 'Open a project folder, edit a file, use Source Control, and identify the active terminal shell.',
        terms: ['directory', 'terminal'],
        explanation: ['VS Code is a text editor. Opening a folder gives the Explorer, source-control tools, search, and terminal the correct project context.', 'Workspace Trust asks whether you trust code in a folder. Trust only projects you created or inspected from a reliable source.', 'Extensions can run code. Install only necessary extensions from publishers you have verified. Git support and Markdown preview are already built in.'],
        steps: [
          { title: 'Install officially', body: 'Download from code.visualstudio.com. On Windows enable Add to PATH and Open with Code if offered. Use the signed official package for macOS/Linux.' },
          { title: 'Open the folder', body: 'Choose File > Open Folder and select Documents/learn-git. Confirm the folder name appears in Explorer.' },
          { title: 'Identify landmarks', body: 'Find Explorer, Search, Source Control, editor tabs, breadcrumbs, status bar, Command Palette, and Settings.' },
          { title: 'Edit and save', body: 'Open practice/notes/checklist.txt, add one line, and save. A dot on the tab means unsaved changes.' },
          { title: 'Open the terminal', body: 'Choose Terminal > New Terminal. Read the shell name and run the current-folder command. It should be learn-git.' }
        ],
        commands: [cmd('Open the current folder in VS Code after PATH setup', { powershell: 'code .', cmd: 'code .', gitbash: 'code .', zsh: 'code .', bash: 'code .' }, 'The dot means the current folder. If code is unavailable, use File > Open Folder.')],
        expected: 'VS Code Explorer shows learn-git, the integrated terminal starts there, and the edited file is saved.',
        practice: 'Create practice/notes/vscode-note.md from Explorer, type a heading, save, rename it, then undo the rename.',
        mistakes: [mistake('Only one file is visible and Source Control lacks context.', 'A file was opened instead of its project folder.', 'Choose File > Open Folder and select learn-git.')],
        visual: { type: 'orientation', title: 'VS Code landmarks', nodes: ['Activity Bar', 'Explorer', 'Editor', 'Integrated terminal', 'Status bar'], alt: 'VS Code includes an Activity Bar, Explorer, main editor, integrated terminal, and status bar.' },
        quiz: q('Why open a folder instead of only one file?', ['It gives tools the project context', 'It automatically publishes a website', 'It removes the need to save'], 0, 'The folder tells Explorer, Git, search, and the terminal which project they are working in.', 'Think about shared project context.', 'What does the dot in code . represent?')
      })
    ]
  },
  {
    id: 'git-foundations', number: '3', title: 'Git foundations', description: 'Record clear, safe project history.',
    lessons: [
      L({
        id: 'why-version-control', title: 'Why version control matters', duration: 15,
        outcome: 'Explain snapshots, history, recovery, and the difference between Git and GitHub.',
        terms: ['version_control', 'git', 'github', 'commit', 'repository'],
        explanation: ['Manual names such as final, final-2, and final-really-final do not reliably show what changed, why it changed, or which copy teammates should use.', 'Git records named snapshots called commits. You can compare snapshots, recover earlier content, attribute work, and develop separate features safely.', 'Git works locally. GitHub stores a remote copy and adds collaboration features. You can use Git without GitHub.'],
        steps: [
          { title: 'Observe the problem', body: 'Imagine three copies of a portfolio with no notes. You cannot safely tell which individual lines changed.' },
          { title: 'Map the solution', body: 'Working tree holds files you edit. Staging selects the next snapshot. A commit stores it locally. Push shares commits with a remote.' },
          { title: 'Adopt the safety habit', body: 'Run git status before and after each Git-changing command.' }
        ],
        expected: 'You can explain commit versus push and Git versus GitHub without using the words interchangeably.',
        practice: 'Describe one change that would make a useful commit in a portfolio project.',
        mistakes: [mistake('Git and GitHub are described as the same tool.', 'Local version control and hosted collaboration were combined.', 'Identify where each action occurs: Git records local history; GitHub hosts a remote and collaboration features.')],
        visual: { type: 'git-areas', title: 'The four Git locations', nodes: ['Working tree', 'git add', 'Staging area', 'git commit', 'Local repository', 'git push', 'GitHub remote'], alt: 'Edits move from the working tree to staging with git add, to local history with git commit, and to GitHub with git push.' },
        quiz: q('Which action shares local commits with GitHub?', ['git push', 'git add', 'Save in VS Code'], 0, 'Push transfers commits to a configured remote.', 'Saving and committing remain local.', 'Can Git work without GitHub?')
      }),
      L({
        id: 'init-repository', title: 'Create your first repository', duration: 25,
        outcome: 'Initialize a portfolio repository and recognize the hidden Git metadata directory.',
        prerequisites: ['configure-git', 'why-version-control'], terms: ['repository', 'git'],
        explanation: ['git init turns the current folder into a repository by creating a hidden .git metadata directory. Do not manually edit or delete it.', 'Initialization does not upload anything. The project remains local until you add a remote and push.', 'Run the command inside the project folder—not its parent and not a nested subfolder.'],
        steps: [
          { title: 'Create and open portfolio', body: 'Inside learn-git create portfolio, then open that folder in VS Code.' },
          { title: 'Confirm the exact path', body: 'Use the terminal location command. The final folder must be portfolio.' },
          { title: 'Initialize', body: 'Run git init, then git status. Read the current branch and “No commits yet.”' },
          { title: 'Create repository files', body: 'Create README.md and .gitignore in the root. Do not create or edit files inside .git.' },
          { title: 'Compare VS Code', body: 'Open Source Control. The files appear under Changes as untracked.' }
        ],
        commands: [
          cmd('Initialize the current project', { powershell: 'git init', cmd: 'git init', gitbash: 'git init', zsh: 'git init', bash: 'git init' }, 'Creates .git in the current folder.', 'Initialized empty Git repository in …/portfolio/.git/'),
          cmd('Inspect repository state', { powershell: 'git status', cmd: 'git status', gitbash: 'git status', zsh: 'git status', bash: 'git status' }, 'A read-only command that reports branch and file states.')
        ],
        expected: 'portfolio is on branch main with README.md and .gitignore listed as untracked.',
        practice: 'Use the file manager’s hidden-item option to observe .git, then hide hidden items again without changing .git.',
        mistakes: [mistake('The parent learn-git folder became the repository.', 'git init ran one folder too high.', 'Before commits exist, remove only the accidental .git metadata after confirming its exact location, then initialize inside portfolio. Ask for help if uncertain.')],
        visual: { type: 'tree', title: 'Repository root', nodes: ['portfolio/', '  .git/ (Git metadata—do not edit)', '  .gitignore', '  README.md'], alt: 'The portfolio repository contains hidden Git metadata, a gitignore file, and a README.' },
        quiz: q('Does git init publish files to GitHub?', ['No, it only initializes local metadata', 'Yes, immediately', 'Only README.md'], 0, 'Initialization is local. Push later shares commits with a remote.', 'No remote has been configured yet.', 'Which hidden folder stores repository metadata?')
      }),
      L({
        id: 'first-commit', title: 'Stage and make a commit', duration: 30,
        outcome: 'Complete the edit-stage-commit cycle from the terminal and VS Code.',
        prerequisites: ['init-repository'], terms: ['staging', 'commit'],
        explanation: ['Saving changes a file. Staging selects exact changes for the next snapshot. Committing records that staged snapshot locally.', 'Untracked means Git has not started recording the file. Modified means a tracked file differs from its committed form. Staged means its current change is selected.', 'A useful commit message begins with an action and describes one logical result, such as “Add project README.”'],
        steps: [
          { title: 'Write the README', body: 'Add a # My Portfolio heading and one sentence. Save it.' },
          { title: 'Inspect and compare', body: 'Run status and diff. Untracked files have no ordinary working-tree diff until Git is asked to track them.' },
          { title: 'Stage selectively', body: 'Stage README.md only. Run status again and observe Changes to be committed.' },
          { title: 'Inspect staged content', body: 'Run git diff --staged. Confirm no private information appears.' },
          { title: 'Commit and inspect history', body: 'Commit with a meaningful message, run status, then view the log.' },
          { title: 'Repeat in VS Code', body: 'Add a comment to .gitignore, use the plus button to stage it, inspect Staged Changes, enter a message, and commit.' }
        ],
        commands: [
          cmd('Stage one file', { powershell: 'git add README.md', cmd: 'git add README.md', gitbash: 'git add README.md', zsh: 'git add README.md', bash: 'git add README.md' }, 'Selects the current README content for the next commit.'),
          cmd('Inspect staged changes', { powershell: 'git diff --staged', cmd: 'git diff --staged', gitbash: 'git diff --staged', zsh: 'git diff --staged', bash: 'git diff --staged' }, 'Shows exactly what the next commit will record.'),
          cmd('Record the snapshot', { powershell: 'git commit -m "Add project README"', cmd: 'git commit -m "Add project README"', gitbash: 'git commit -m "Add project README"', zsh: 'git commit -m "Add project README"', bash: 'git commit -m "Add project README"' }, '-m supplies the commit message.'),
          cmd('View concise history', { powershell: 'git log --oneline', cmd: 'git log --oneline', gitbash: 'git log --oneline', zsh: 'git log --oneline', bash: 'git log --oneline' }, 'Shows abbreviated commit hashes and subjects.')
        ],
        expected: 'git status reports a clean working tree after the commits, and log shows meaningful messages.',
        practice: 'Add learning-notes.md, stage it separately, inspect the staged diff, and commit it as “Add Git learning notes.”',
        mistakes: [mistake('The commit omitted a saved change.', 'The change was not staged before committing.', 'Run status, stage the intended change, inspect --staged, and create a new focused commit.')],
        visual: { type: 'git-areas', title: 'Edit-stage-commit', nodes: ['Edit + save', 'git add', 'Inspect staged diff', 'git commit', 'Clean status'], alt: 'Save an edit, stage it, inspect staged changes, commit, and confirm clean status.' },
        quiz: q('Which command shows exactly what the next commit contains?', ['git diff --staged', 'git push', 'git init'], 0, 'The staged diff displays the selected snapshot changes.', 'The next commit comes from staging.', 'Does saving a file automatically stage it?')
      }),
      L({
        id: 'gitignore', title: '.gitignore and safe project files', duration: 30,
        outcome: 'Write, test, and troubleshoot ignore rules without mistaking them for security controls.',
        prerequisites: ['first-commit'], terms: ['repository'],
        explanation: ['.gitignore prevents matching untracked files from being offered for tracking. It does not encrypt files, remove existing history, or stop someone from reading files already published.', 'Rules may target a filename, folder, extension pattern, rooted path, or exception. A leading ! re-includes a path. Comments start with #.', 'A repository .gitignore is shared. A global ignore holds personal OS/editor clutter. .git/info/exclude is local to one clone.'],
        steps: [
          { title: 'Add practical rules', body: 'Ignore .env, logs, dependencies, build output, and OS metadata. Keep .env.example available.' },
          { title: 'Create safe examples', body: 'Create .env containing only fake practice text and .env.example containing API_URL=. Confirm only the example appears in status.' },
          { title: 'Diagnose a rule', body: 'Use git check-ignore -v .env to show the matching file and line.' },
          { title: 'Understand tracked files', body: 'In a disposable example, observe that adding a rule does not untrack a file committed earlier.' },
          { title: 'Commit policy', body: 'Stage .gitignore and .env.example, inspect staged content, and commit. Never stage the real .env.' }
        ],
        commands: [
          cmd('Inspect why a file is ignored', { powershell: 'git check-ignore -v .env', cmd: 'git check-ignore -v .env', gitbash: 'git check-ignore -v .env', zsh: 'git check-ignore -v .env', bash: 'git check-ignore -v .env' }, 'Reports the ignore source, line, pattern, and matched path.'),
          cmd('Stop tracking a file but keep the local copy', { powershell: 'git rm --cached example.log', cmd: 'git rm --cached example.log', gitbash: 'git rm --cached example.log', zsh: 'git rm --cached example.log', bash: 'git rm --cached example.log' }, 'Use only for a file already tracked and now intentionally ignored. Commit the removal from tracking.')
        ],
        expected: '.env is ignored, .env.example remains trackable, and check-ignore identifies the responsible rule.',
        practice: 'Ignore every .log file, but use an exception rule to allow docs/example.log. Verify both paths with status and check-ignore.',
        mistakes: [
          mistake('A newly ignored file still appears as modified.', 'The file was already tracked.', 'If it should not be tracked, remove it from the index with --cached, verify the local copy remains, and commit.'),
          mistake('A secret was published before being ignored.', '.gitignore cannot erase history.', 'Revoke/rotate the secret first, remove it from current content, and follow approved history-cleanup guidance.')
        ],
        visual: { type: 'decision', title: 'Will .gitignore hide it from Git?', nodes: ['Is file already tracked?', 'Yes → rule does not untrack', 'No → matching rule ignores', 'Secrets still require protection'], alt: 'Ignore rules affect matching untracked files; already tracked files remain tracked, and ignore is not secret protection.' },
        quiz: q('What happens when a tracked file is added to .gitignore?', ['It remains tracked', 'Its history is erased', 'Git encrypts it'], 0, 'Ignore rules do not automatically untrack files already recorded.', 'The rule controls untracked-file discovery.', 'Which command explains the matching ignore rule?')
      }),
      L({
        id: 'inspect-recover', title: 'Inspect and safely undo changes', duration: 30,
        outcome: 'Choose a safe recovery based on whether work is unstaged, staged, local, or shared.',
        prerequisites: ['first-commit'], terms: ['commit', 'staging'],
        explanation: ['Inspect before changing: status shows state, diff shows content, log shows history, and show inspects a commit.', 'Restore can discard an unstaged practice edit or unstage without deleting work. Amend changes the latest local commit. Revert creates a new commit that reverses a shared commit.', 'Reset and force push rewrite references/history and are deferred to a disposable advanced lab.'],
        steps: [
          { title: 'Inspect a controlled edit', body: 'Change one README sentence, run status and diff, then restore it only after confirming it is deliberate practice.' },
          { title: 'Unstage safely', body: 'Make another edit, stage it, run git restore --staged README.md, and confirm the edit remains in the file.' },
          { title: 'Inspect a commit', body: 'Use git log --oneline and git show with an abbreviated hash.' },
          { title: 'Choose shared recovery', body: 'For a bad commit already pushed, use revert so teammates receive a new, understandable correction.' }
        ],
        commands: [
          cmd('Discard one unstaged practice edit', { powershell: 'git restore README.md', cmd: 'git restore README.md', gitbash: 'git restore README.md', zsh: 'git restore README.md', bash: 'git restore README.md' }, 'Destructive to the uncommitted change in that file. Inspect git diff first.'),
          cmd('Unstage but keep the edit', { powershell: 'git restore --staged README.md', cmd: 'git restore --staged README.md', gitbash: 'git restore --staged README.md', zsh: 'git restore --staged README.md', bash: 'git restore --staged README.md' }, 'Moves selection out of staging while leaving the working file changed.'),
          cmd('Safely reverse a shared commit', { powershell: 'git revert <commit-hash>', cmd: 'git revert <commit-hash>', gitbash: 'git revert <commit-hash>', zsh: 'git revert <commit-hash>', bash: 'git revert <commit-hash>' }, 'Replace the placeholder. Revert creates a new inverse commit.')
        ],
        expected: 'You can state which recovery preserves working content and which creates safe shared history.',
        practice: 'Create a harmless typo commit, then revert it. Inspect the two commits and final file content.',
        mistakes: [mistake('An unstaged edit disappeared.', 'git restore replaced it from the index/commit.', 'Use restore only after inspecting diff. Uncommitted content may not be recoverable; recreate it from another source if available.')],
        visual: { type: 'decision', title: 'Recovery by state', nodes: ['Unstaged → restore carefully', 'Staged → restore --staged', 'Latest local → amend', 'Shared → revert'], alt: 'Use different recovery tools for unstaged, staged, local committed, and shared committed changes.' },
        quiz: q('Which action safely reverses a commit already shared with teammates?', ['git revert', 'Delete .git', 'Force push'], 0, 'Revert preserves shared history by adding a correcting commit.', 'Prefer an additive correction for shared history.', 'Which command unstages while preserving the working edit?')
      }),
      L({
        id: 'tracked-files-attributes', title: 'Track files, partial changes, and cross-platform attributes', duration: 30,
        outcome: 'Stage only intended changes, move or remove tracked files correctly, and define text and binary behavior across operating systems.',
        prerequisites: ['gitignore', 'first-commit'], terms: ['staging'],
        explanation: ['Git records snapshots and detects likely renames by comparing content. git mv and git rm combine filesystem and staging actions; ordinary file-manager changes also work when followed by staging.', 'Partial staging selects only some changed lines for a focused commit. VS Code supports staging selected ranges; the terminal offers git add -p.', 'Git does not record empty folders. A placeholder such as .gitkeep is an ordinary convention. .gitattributes defines text normalization and binary treatment. Git LFS is optional for large binaries and has hosting limits.'],
        steps: [
          { title: 'Stage a portion', body: 'Make two independent edits in one practice file. Use VS Code Stage Selected Ranges or git add -p to select only the first logical change.' },
          { title: 'Move and remove tracked files', body: 'Use git mv for a practice rename and git rm for an intentionally deleted tracked file. Inspect status and staged diff.' },
          { title: 'Represent an empty folder', body: 'Add an explanatory .gitkeep only when a project truly needs the folder in fresh clones.' },
          { title: 'Define attributes', body: 'Add * text=auto and explicit binary image rules to .gitattributes. Review line-ending policy with the team.' },
          { title: 'Assess large assets', body: 'Optimize portfolio images first. Evaluate Git LFS limits and cost before adopting it.' }
        ],
        commands: [
          cmd('Stage selected change hunks', { powershell: 'git add -p README.md', cmd: 'git add -p README.md', gitbash: 'git add -p README.md', zsh: 'git add -p README.md', bash: 'git add -p README.md' }, 'Review each hunk and select only changes belonging in the next commit.'),
          cmd('Move and remove tracked practice files', { powershell: 'git mv old-name.md new-name.md\ngit rm obsolete.md\ngit diff --staged', cmd: 'git mv old-name.md new-name.md\ngit rm obsolete.md\ngit diff --staged', gitbash: 'git mv old-name.md new-name.md\ngit rm obsolete.md\ngit diff --staged', zsh: 'git mv old-name.md new-name.md\ngit rm obsolete.md\ngit diff --staged', bash: 'git mv old-name.md new-name.md\ngit rm obsolete.md\ngit diff --staged' }, 'Use prepared disposable files. Both operations stage their result; inspect before committing.')
        ],
        expected: 'Only the intended hunk is staged, rename and deletion state is understood, and .gitattributes documents cross-platform policy.',
        practice: 'Create two independent README edits, stage and commit them separately, then verify each commit contains one concern.',
        mistakes: [mistake('One commit contains unrelated edits.', 'The whole file was staged without reviewing hunks.', 'Unstage while keeping work, then use partial staging or VS Code selected ranges to rebuild focused commits.')],
        visual: { type: 'flow', title: 'Tracked-file lifecycle', nodes: ['Untracked', 'git add', 'Tracked + staged', 'commit', 'Modified', 'partial stage', 'focused commit'], alt: 'A file becomes tracked through staging and commit; later modifications can be partially staged into focused commits.' },
        quiz: q('Does .gitkeep have special built-in meaning to Git?', ['No, it is an ordinary convention', 'Yes, it encrypts a folder', 'Yes, it stores every empty directory'], 0, 'Git tracks files, and .gitkeep is simply a conventional placeholder filename.', 'Git records files rather than empty folders.', 'Which command interactively selects change hunks?')
      })
    ]
  },
  {
    id: 'remotes', number: '4', title: 'GitHub remotes', description: 'Connect, clone, fetch, pull, and push.',
    lessons: [
      L({
        id: 'connect-github', title: 'Create and connect a GitHub repository', duration: 30,
        outcome: 'Connect the local portfolio to an empty GitHub repository and perform the first push.',
        prerequisites: ['first-commit', 'github-account'], terms: ['github', 'repository'],
        explanation: ['A remote is a saved name and URL for another repository. origin is a convention, not a special Git keyword.', 'When connecting an existing local repository, create an empty GitHub repository without also initializing README, .gitignore, or license; this avoids two unrelated starting histories.', 'The first push can set the upstream relationship so later push and pull commands know the matching remote branch.'],
        steps: [
          { title: 'Pre-push safety review', body: 'Run status, inspect committed files, and search for secrets or personal information.' },
          { title: 'Create the empty remote', body: 'On GitHub choose New repository, name it portfolio, select visibility deliberately, and leave initialization options off.' },
          { title: 'Copy the HTTPS URL', body: 'Use the repository Code control and copy HTTPS. Confirm the owner and repository name.' },
          { title: 'Add and inspect origin', body: 'Add the copied URL, then list remotes with their fetch and push URLs.' },
          { title: 'Push main', body: 'Push main with upstream tracking. Complete browser or credential-manager authentication if requested.' },
          { title: 'Verify online', body: 'Refresh GitHub and compare README and commit messages with local history.' }
        ],
        commands: [
          cmd('Add the GitHub remote', { powershell: 'git remote add origin https://github.com/<your-user>/portfolio.git', cmd: 'git remote add origin https://github.com/<your-user>/portfolio.git', gitbash: 'git remote add origin https://github.com/<your-user>/portfolio.git', zsh: 'git remote add origin https://github.com/<your-user>/portfolio.git', bash: 'git remote add origin https://github.com/<your-user>/portfolio.git' }, 'Replace the full placeholder URL with the copied HTTPS URL.'),
          cmd('Inspect remotes', { powershell: 'git remote -v', cmd: 'git remote -v', gitbash: 'git remote -v', zsh: 'git remote -v', bash: 'git remote -v' }, 'Shows saved names and URLs without contacting GitHub.'),
          cmd('Push and set upstream', { powershell: 'git push -u origin main', cmd: 'git push -u origin main', gitbash: 'git push -u origin main', zsh: 'git push -u origin main', bash: 'git push -u origin main' }, '-u links local main to origin/main for later commands.')
        ],
        expected: 'GitHub displays the same committed files, and git status says main is up to date with origin/main.',
        practice: 'Edit README, commit locally, notice Git reports one commit ahead, push, and verify GitHub.',
        mistakes: [mistake('Remote origin already exists.', 'A remote with that name was configured earlier.', 'Run git remote -v. If the URL is wrong, use git remote set-url origin <correct-url>; do not add a duplicate blindly.')],
        visual: { type: 'remote', title: 'Local and remote', nodes: ['Local portfolio', 'origin = saved URL', 'GitHub portfolio', 'push →', '← fetch'], alt: 'The local repository connects to the GitHub repository through a saved remote named origin; push sends commits and fetch retrieves remote history.' },
        quiz: q('What does origin represent?', ['A conventional saved remote name', 'The first commit', 'Your GitHub password'], 0, 'origin is the conventional name Git gives or users assign to the primary remote.', 'It maps to a URL.', 'What does -u establish on the first push?')
      }),
      L({
        id: 'clone-repository', title: 'Clone without nested-folder mistakes', duration: 22,
        outcome: 'Clone an existing repository into the intended parent directory and inspect what Git configured.',
        prerequisites: ['connect-github'], terms: ['repository'],
        explanation: ['Clone downloads project history, creates a new folder, checks out a branch, and configures origin.', 'Choose the parent destination before cloning. Running git clone while already inside a folder named portfolio often creates unwanted portfolio/portfolio nesting.', 'Cloning is different from downloading a ZIP because a clone retains Git history and remote configuration.'],
        steps: [
          { title: 'Use a separate practice location', body: 'Create a folder named clone-practice outside the original portfolio. Navigate into clone-practice.' },
          { title: 'Copy the HTTPS URL', body: 'On GitHub use Code > HTTPS and copy the URL.' },
          { title: 'Clone from the parent', body: 'Run git clone with the URL while clone-practice is current.' },
          { title: 'Enter and inspect', body: 'Change into portfolio. Run status, branch, log, and remote inspection commands.' },
          { title: 'Clone in VS Code', body: 'Alternatively use Command Palette > Git: Clone, choose the parent destination, then open the cloned repository.' }
        ],
        commands: [
          cmd('Clone the repository', { powershell: 'git clone https://github.com/<your-user>/portfolio.git', cmd: 'git clone https://github.com/<your-user>/portfolio.git', gitbash: 'git clone https://github.com/<your-user>/portfolio.git', zsh: 'git clone https://github.com/<your-user>/portfolio.git', bash: 'git clone https://github.com/<your-user>/portfolio.git' }, 'Run from the intended parent. Git creates the portfolio child folder.'),
          cmd('Inspect the clone', { powershell: 'cd portfolio\ngit status\ngit remote -v', cmd: 'cd portfolio\ngit status\ngit remote -v', gitbash: 'cd portfolio\ngit status\ngit remote -v', zsh: 'cd portfolio\ngit status\ngit remote -v', bash: 'cd portfolio\ngit status\ngit remote -v' }, 'Confirms current repository state and origin URL.')
        ],
        expected: 'clone-practice/portfolio contains files and history, has origin configured, and starts clean.',
        practice: 'Compare git log --oneline in the original and clone. The commit hashes should match.',
        mistakes: [mistake('The path is portfolio/portfolio.', 'Clone ran inside an existing portfolio folder.', 'If the nested clone contains no unique work, close apps, verify both paths, remove the disposable nested clone, return to the parent, and clone again.')],
        visual: { type: 'tree', title: 'Correct clone destination', nodes: ['clone-practice/ (current before clone)', '  portfolio/ (created by clone)', '    .git/', '    README.md'], alt: 'Run clone from clone-practice so Git creates one portfolio child folder.' },
        quiz: q('Where should you stand before cloning portfolio?', ['In the intended parent folder', 'Inside another portfolio folder', 'Inside .git'], 0, 'Clone normally creates the repository folder inside the current parent.', 'Avoid duplicated folder names.', 'How does a clone differ from a ZIP download?')
      }),
      L({
        id: 'fetch-pull-push', title: 'Fetch, pull, push, and rejected pushes', duration: 30,
        outcome: 'Explain data direction, inspect incoming changes, and recover safely from a rejected push.',
        prerequisites: ['clone-repository'], terms: ['commit', 'branch'],
        explanation: ['Fetch downloads remote references without changing your working branch. Pull fetches and then integrates. Push sends local commits.', 'An upstream links a local branch with a remote-tracking branch. Ahead and behind describe commit relationships—not unsaved file changes.', 'A non-fast-forward rejection protects remote commits you do not have. Do not solve it with force. Fetch, inspect, integrate, test, and push again.'],
        steps: [
          { title: 'Create a remote change', body: 'In the original clone, commit and push a README line.' },
          { title: 'Fetch in the second clone', body: 'Run fetch, then status and a log graph. Observe that working files did not change.' },
          { title: 'Integrate deliberately', body: 'Pull with fast-forward-only when local main has no unique commits.' },
          { title: 'Observe a safe rejection', body: 'In a controlled exercise, create distinct commits in both clones, push one, then see the other push rejected.' },
          { title: 'Recover', body: 'Fetch, inspect both histories, merge or rebase according to the project policy, test, then push.' }
        ],
        commands: [
          cmd('Download remote references only', { powershell: 'git fetch origin', cmd: 'git fetch origin', gitbash: 'git fetch origin', zsh: 'git fetch origin', bash: 'git fetch origin' }, 'Updates origin/* references without integrating into the current branch.'),
          cmd('Update main only if fast-forward is possible', { powershell: 'git pull --ff-only', cmd: 'git pull --ff-only', gitbash: 'git pull --ff-only', zsh: 'git pull --ff-only', bash: 'git pull --ff-only' }, 'Stops instead of creating an unexpected merge commit when histories diverge.'),
          cmd('View local and remote graph', { powershell: 'git log --oneline --graph --decorate --all', cmd: 'git log --oneline --graph --decorate --all', gitbash: 'git log --oneline --graph --decorate --all', zsh: 'git log --oneline --graph --decorate --all', bash: 'git log --oneline --graph --decorate --all' }, 'Shows branch labels and relationships.')
        ],
        expected: 'You can point to the direction of each operation and recover from rejection without force.',
        practice: 'Fetch a remote change, inspect origin/main with git show, then integrate it.',
        mistakes: [mistake('Push is rejected as non-fast-forward.', 'The remote has commits absent locally.', 'Fetch, inspect the graph, integrate the target branch, resolve/test if needed, then push. Do not force.')],
        visual: { type: 'remote', title: 'Data directions', nodes: ['Local ← fetch — GitHub', 'Local ← pull + integrate — GitHub', 'Local — push → GitHub'], alt: 'Fetch downloads references, pull downloads and integrates, and push uploads commits.' },
        quiz: q('Which command downloads remote history without changing the current branch?', ['git fetch', 'git push', 'git commit'], 0, 'Fetch updates remote-tracking references without integrating.', 'Separate downloading from integration.', 'Why does Git reject a non-fast-forward push?')
      })
    ]
  },
  {
    id: 'branches', number: '5', title: 'Feature branches', description: 'Develop independently and synchronize safely.',
    lessons: [
      L({
        id: 'branch-basics', title: 'Understand and create branches', duration: 25,
        outcome: 'Create a feature branch from updated main and explain a branch as a movable commit label.',
        prerequisites: ['fetch-pull-push'], terms: ['branch', 'commit'],
        explanation: ['A branch is a movable label pointing to a commit. It is not a separate manual copy of every project file.', 'Start a feature from the current target branch after fetching and updating it. Use readable names such as feature/add-about-section.', 'git switch is the modern branch-focused command. Older documentation may use git checkout.'],
        steps: [
          { title: 'Protect current work', body: 'Commit or deliberately stash current changes. Run status and require a clean working tree for this exercise.' },
          { title: 'Update main', body: 'Switch to main, fetch origin, and pull fast-forward-only.' },
          { title: 'Create and switch', body: 'Create feature/add-about-section and switch to it in one command.' },
          { title: 'Inspect labels', body: 'List branches and view the decorated graph. The asterisk identifies the current branch.' },
          { title: 'Use VS Code', body: 'Select the branch name in the status bar to switch or create a branch. Confirm the displayed current branch.' }
        ],
        commands: [
          cmd('Create and switch to a feature branch', { powershell: 'git switch -c feature/add-about-section', cmd: 'git switch -c feature/add-about-section', gitbash: 'git switch -c feature/add-about-section', zsh: 'git switch -c feature/add-about-section', bash: 'git switch -c feature/add-about-section' }, '-c creates a new branch at the current commit and switches to it.'),
          cmd('List branches', { powershell: 'git branch --all', cmd: 'git branch --all', gitbash: 'git branch --all', zsh: 'git branch --all', bash: 'git branch --all' }, 'Shows local and remote-tracking branch names.')
        ],
        expected: 'The current branch is feature/add-about-section and it starts at the latest main commit.',
        practice: 'Create a temporary practice branch, switch back to the feature, then safely delete the unused practice branch.',
        mistakes: [mistake('The feature is missing recent main commits.', 'It was created before main was updated.', 'Fetch, update main, return to the feature, and merge main into it as taught in synchronization.')],
        visual: { type: 'git-graph', title: 'A branch is a label', nodes: ['A—B (main)', '   \\ C (feature/about)', 'New feature commits move only the feature label'], alt: 'Main points to commit B while the feature branch moves to new commit C.' },
        quiz: q('What does a branch primarily represent?', ['A movable label pointing to a commit', 'A GitHub password', 'A second Git installation'], 0, 'Branches identify lines of history by pointing to commits.', 'Think of the commit graph.', 'Why update main before creating a feature?')
      }),
      L({
        id: 'feature-work', title: 'Develop and publish a feature branch', duration: 30,
        outcome: 'Create focused feature commits, compare with main, and publish the branch without touching main.',
        prerequisites: ['branch-basics'], terms: ['branch', 'staging'],
        explanation: ['A feature branch keeps incomplete work separate from the deployable branch. Commit coherent steps that reviewers can understand.', 'Comparing feature against main shows the complete proposed change. Pushing a new branch with -u establishes its upstream.', 'Protected shared branches should receive reviewed pull requests rather than direct feature pushes.'],
        steps: [
          { title: 'Add the feature files', body: 'Create index.html with a semantic About section and css/styles.css with a readable base style.' },
          { title: 'Commit logical steps', body: 'Commit structure separately from styling. Inspect each staged diff first.' },
          { title: 'Compare with main', body: 'View commit and content differences between main and the feature.' },
          { title: 'Push only the feature', body: 'Push feature/add-about-section with upstream tracking.' },
          { title: 'Verify GitHub', body: 'The new branch should exist while main remains unchanged.' }
        ],
        commands: [
          cmd('Compare feature commits to main', { powershell: 'git log --oneline main..HEAD', cmd: 'git log --oneline main..HEAD', gitbash: 'git log --oneline main..HEAD', zsh: 'git log --oneline main..HEAD', bash: 'git log --oneline main..HEAD' }, 'Shows commits reachable from the current branch but not main.'),
          cmd('Compare file changes to main', { powershell: 'git diff main...HEAD', cmd: 'git diff main...HEAD', gitbash: 'git diff main...HEAD', zsh: 'git diff main...HEAD', bash: 'git diff main...HEAD' }, 'Three-dot comparison shows the feature change since its common ancestor with main.'),
          cmd('Publish and track the feature', { powershell: 'git push -u origin feature/add-about-section', cmd: 'git push -u origin feature/add-about-section', gitbash: 'git push -u origin feature/add-about-section', zsh: 'git push -u origin feature/add-about-section', bash: 'git push -u origin feature/add-about-section' }, 'Creates the branch on origin and records upstream tracking.')
        ],
        expected: 'GitHub has the feature branch with focused commits, while main has not changed.',
        practice: 'Use VS Code’s branch comparison and Source Control diff to self-review every changed line.',
        mistakes: [mistake('Changes were committed on main.', 'The current branch was not checked before editing.', 'If unshared, create a feature branch at the commit and restore main to team policy with guidance. If shared, do not rewrite; use a follow-up PR/revert plan.')],
        visual: { type: 'git-graph', title: 'Feature work stays isolated', nodes: ['A—B main', '   \\ C—D feature/about', 'Push feature → origin/feature/about'], alt: 'Main remains at B while the feature branch gains commits C and D and is pushed to its matching remote branch.' },
        quiz: q('What changes when you push a new feature branch?', ['The remote gains that branch; main is unchanged', 'Main automatically merges it', 'All local files are deleted'], 0, 'Pushing publishes commits under the feature branch name. Merge is a separate reviewed action.', 'Push and merge are separate.', 'What does main..HEAD show?')
      }),
      L({
        id: 'sync-feature', title: 'Synchronize a feature with its target', duration: 30,
        outcome: 'Bring current main changes into a feature, test, and update the remote feature branch.',
        prerequisites: ['feature-work'], terms: ['branch'],
        explanation: ['Synchronize from the branch the pull request will target. For a PR into main, update from main. For a team PR into develop, use develop.', 'The beginner-safe workflow merges updated main into the feature. Rebase is optional and rewrites unpublished commit identities.', 'A local main should usually mirror origin/main. Update it before merging it into the feature.'],
        steps: [
          { title: 'Save feature work', body: 'Commit intended work and confirm status is clean.' },
          { title: 'Fetch remote state', body: 'Fetch origin so origin/main reflects GitHub.' },
          { title: 'Update local main', body: 'Switch to main and pull fast-forward-only.' },
          { title: 'Merge into feature', body: 'Return to feature/add-about-section and merge main.' },
          { title: 'Resolve and test', body: 'If conflicts occur, resolve them carefully. Open the page, check layout, and inspect status.' },
          { title: 'Push updated feature', body: 'Push the feature branch. Never push the merge directly to an unrelated deployment branch.' }
        ],
        commands: [cmd('Synchronize feature from main', { powershell: 'git fetch origin\ngit switch main\ngit pull --ff-only\ngit switch feature/add-about-section\ngit merge main', cmd: 'git fetch origin\ngit switch main\ngit pull --ff-only\ngit switch feature/add-about-section\ngit merge main', gitbash: 'git fetch origin\ngit switch main\ngit pull --ff-only\ngit switch feature/add-about-section\ngit merge main', zsh: 'git fetch origin\ngit switch main\ngit pull --ff-only\ngit switch feature/add-about-section\ngit merge main', bash: 'git fetch origin\ngit switch main\ngit pull --ff-only\ngit switch feature/add-about-section\ngit merge main' }, 'Each line is a separate checkpoint. Stop if one fails; inspect status before continuing.')],
        expected: 'The feature contains current main plus its own changes, tests pass, and its remote branch is updated.',
        practice: 'Draw the commit graph before and after merging main into the feature.',
        mistakes: [mistake('The wrong branch was merged.', 'The feature’s PR target was not identified.', 'Do not continue blindly. Inspect the PR target and graph; abort an unfinished merge with git merge --abort, then synchronize from the correct target.')],
        visual: { type: 'flow', title: 'Safe synchronization', nodes: ['Commit feature', 'Fetch origin', 'Update main', 'Return to feature', 'Merge main', 'Resolve + test', 'Push feature'], alt: 'Save feature work, fetch, update main, return to the feature, merge main, resolve and test, then push the feature.' },
        quiz: q('A feature PR targets main. Which branch should it synchronize from?', ['Updated main', 'An unrelated production branch', 'A random teammate branch'], 0, 'Synchronize from the actual integration target.', 'Read the PR base/target.', 'Why fetch before updating local main?')
      }),
      L({
        id: 'stash-context', title: 'Temporarily switch work with stash', duration: 22,
        outcome: 'Use stash deliberately for short local context changes and recover its contents.',
        prerequisites: ['branch-basics'], terms: ['staging'],
        explanation: ['A small work-in-progress commit is often clearer and safer. Stash is useful when incomplete local changes cannot be committed and you must switch temporarily.', 'A stash is local, not automatically backed up, not visible to teammates, and easy to forget. Untracked files require an explicit option.', 'Apply keeps the stash entry; pop applies and removes it if successful. Inspect before dropping.'],
        steps: [
          { title: 'Create controlled work', body: 'Edit a tracked practice file and create one untracked practice file.' },
          { title: 'Stash deliberately', body: 'Include untracked files and give the stash a descriptive message.' },
          { title: 'Switch and inspect', body: 'Switch to main, confirm a clean tree, then return to the feature.' },
          { title: 'List and inspect', body: 'List stash entries and show the patch before restoring.' },
          { title: 'Restore and verify', body: 'Apply or pop, inspect status and files, then commit or continue work.' }
        ],
        commands: [
          cmd('Stash tracked and untracked practice work', { powershell: 'git stash push -u -m "WIP about section"', cmd: 'git stash push -u -m "WIP about section"', gitbash: 'git stash push -u -m "WIP about section"', zsh: 'git stash push -u -m "WIP about section"', bash: 'git stash push -u -m "WIP about section"' }, '-u includes untracked files. Ignored files remain excluded.'),
          cmd('Inspect and restore', { powershell: 'git stash list\ngit stash show -p stash@{0}\ngit stash pop', cmd: 'git stash list\ngit stash show -p stash@{0}\ngit stash pop', gitbash: "git stash list\ngit stash show -p 'stash@{0}'\ngit stash pop", zsh: "git stash list\ngit stash show -p 'stash@{0}'\ngit stash pop", bash: "git stash list\ngit stash show -p 'stash@{0}'\ngit stash pop" }, 'PowerShell/Command Prompt and Unix shells parse braces differently; quoted syntax is safest in Unix-style shells.')
        ],
        expected: 'The original changes are restored and the stash entry is removed only after successful pop.',
        practice: 'Create a second stash, apply it without dropping, verify it remains listed, then drop only that verified practice entry.',
        mistakes: [mistake('The new file did not enter the stash.', 'Untracked files were not included.', 'Return to the source branch and use git stash push -u after confirming status.')],
        visual: { type: 'flow', title: 'Short context switch', nodes: ['Working changes', 'stash locally', 'Urgent branch', 'Return', 'Inspect + restore stash'], alt: 'Temporarily store local changes, handle urgent work, return, inspect, and restore the stash.' },
        quiz: q('Is a stash a shared backup?', ['No, it is local temporary storage', 'Yes, GitHub receives it', 'Yes, forever'], 0, 'Stashes remain in the local repository and are easy to lose or forget.', 'No push occurred.', 'What does -u include?')
      })
    ]
  },
  {
    id: 'collaboration', number: '6', title: 'Team collaboration', description: 'Review, merge, resolve conflicts, and promote safely.',
    lessons: [
      L({
        id: 'collaboration-models', title: 'Collaborators, forks, origin, and upstream', duration: 25,
        outcome: 'Choose a shared-repository or fork workflow and identify who can push where.',
        prerequisites: ['feature-work'], terms: ['repository', 'pull_request'],
        explanation: ['In a shared repository, authorized collaborators push feature branches to the same GitHub repository. In a fork workflow, a contributor pushes to their own copy and proposes changes to the source repository.', 'In a fork clone, origin normally points to your fork and upstream points to the source. Fetch upstream to learn about source changes; push your branch to origin.', 'Use least privilege. Public readability does not grant write access.'],
        steps: [
          { title: 'Map ownership', body: 'User A owns the source. User B either receives collaborator access or creates a fork.' },
          { title: 'Inspect remotes', body: 'In the fork workflow, verify origin is User B’s fork before pushing.' },
          { title: 'Add upstream', body: 'Save the source repository URL as upstream and fetch it.' },
          { title: 'Create from source main', body: 'Create the feature from current upstream/main, then push the feature to origin.' }
        ],
        commands: [
          cmd('Add the source repository to a fork clone', { powershell: 'git remote add upstream https://github.com/<source-owner>/portfolio.git', cmd: 'git remote add upstream https://github.com/<source-owner>/portfolio.git', gitbash: 'git remote add upstream https://github.com/<source-owner>/portfolio.git', zsh: 'git remote add upstream https://github.com/<source-owner>/portfolio.git', bash: 'git remote add upstream https://github.com/<source-owner>/portfolio.git' }, 'origin should remain the contributor’s fork; upstream is the source.'),
          cmd('Fetch source history', { powershell: 'git fetch upstream', cmd: 'git fetch upstream', gitbash: 'git fetch upstream', zsh: 'git fetch upstream', bash: 'git fetch upstream' }, 'Downloads source branches into upstream/* references.')
        ],
        expected: 'You can state whether the contributor pushes to the shared repository or their fork and where the PR will target.',
        practice: 'Draw User B local → origin fork → pull request → upstream source.',
        mistakes: [mistake('Push permission is denied.', 'The contributor tried to push to a source repository without access.', 'Confirm remote URLs. Push the feature to the contributor’s fork and open a cross-fork PR.')],
        visual: { type: 'remote', title: 'Fork relationship', nodes: ['User B local', 'push → origin (B fork)', 'PR → upstream (A source)', 'fetch ← upstream'], alt: 'A contributor pushes to their fork named origin, opens a pull request to the source, and fetches source changes from upstream.' },
        quiz: q('In a normal fork clone, where does origin point?', ['The contributor’s fork', 'The source owner’s password', 'Every GitHub repository'], 0, 'origin conventionally points to the repository that was cloned—here, the contributor’s fork.', 'The fork was the clone URL.', 'What conventional name identifies the source repository?')
      }),
      L({
        id: 'pull-request', title: 'Open, review, and merge a pull request', duration: 35,
        outcome: 'Complete a two-person GitHub review without confusing a pull request with git pull.',
        prerequisites: ['sync-feature', 'collaboration-models'], terms: ['pull_request'],
        explanation: ['A pull request is a hosted proposal to merge a compare branch into a base branch. git pull is a local command that fetches and integrates; they are different.', 'User A authors the change. User B reviews changed files, asks questions, suggests improvements, and approves only after requirements and checks pass.', 'Additional commits pushed to the feature appear automatically in the same PR. Do not open a replacement PR for each correction.'],
        steps: [
          { title: 'Self-review', body: 'Synchronize with the target, run the site, inspect every changed file, and push.' },
          { title: 'Open the PR', body: 'On GitHub choose the feature as compare and main as base. Use a clear title and describe what, why, testing, screenshots, and related issue.' },
          { title: 'Review as User B', body: 'Open Files changed, leave precise comments, and approve or request changes. Review code, not the person.' },
          { title: 'Update as User A', body: 'Make requested changes on the same feature branch, commit, push, and reply to resolved conversations.' },
          { title: 'Merge after checks', body: 'Use the repository’s merge method. Squash is useful for a noisy small feature; merge commit preserves branch structure. Delete the remote feature when safe.' },
          { title: 'Update locally', body: 'Switch to main, pull fast-forward-only, verify the merged work, and delete the fully merged local feature.' }
        ],
        commands: [cmd('Clean up after merge', { powershell: 'git switch main\ngit pull --ff-only\ngit branch -d feature/add-about-section\ngit fetch --prune', cmd: 'git switch main\ngit pull --ff-only\ngit branch -d feature/add-about-section\ngit fetch --prune', gitbash: 'git switch main\ngit pull --ff-only\ngit branch -d feature/add-about-section\ngit fetch --prune', zsh: 'git switch main\ngit pull --ff-only\ngit branch -d feature/add-about-section\ngit fetch --prune', bash: 'git switch main\ngit pull --ff-only\ngit branch -d feature/add-about-section\ngit fetch --prune' }, '-d refuses deletion if Git does not consider the branch merged. Prune removes stale remote-tracking references.')],
        expected: 'The PR records discussion, checks, approval, and merge; local main matches the merged remote.',
        practice: 'Use a draft PR for an incomplete project card, then mark it ready only after the acceptance checklist passes.',
        mistakes: [mistake('The PR targets the wrong base branch.', 'Base and compare were not checked.', 'Change the base if project policy permits, re-review the diff, and synchronize from the correct target before merge.')],
        visual: { type: 'flow', title: 'Pull request lifecycle', nodes: ['Issue', 'Feature branch', 'Self-review', 'Open PR', 'Review + checks', 'Update', 'Merge', 'Clean up'], alt: 'Work begins with an issue and branch, continues through self-review, pull request, review and checks, updates, merge, and cleanup.' },
        quiz: q('What happens when new commits are pushed to an open PR branch?', ['The existing PR updates', 'The PR disappears', 'main changes without merge'], 0, 'A pull request follows its compare branch, so new branch commits appear automatically.', 'The PR points to a branch.', 'How is a pull request different from git pull?')
      }),
      L({
        id: 'merge-conflicts', title: 'Understand and resolve merge conflicts', duration: 35,
        outcome: 'Resolve a controlled same-line conflict, test the result, and complete or abort the merge.',
        prerequisites: ['pull-request'], terms: ['branch', 'commit'],
        explanation: ['A conflict means Git cannot safely choose between changes. It is a request for human intent, not a broken repository.', 'Conflict markers show current content, a separator, and incoming content. The correct result may be one side, both, or a new combination.', 'Never choose Accept All blindly. Understand the intended final file, remove markers, test, stage, and complete the merge.'],
        steps: [
          { title: 'Create controlled divergence', body: 'In a practice repository, User A and User B change the same heading differently and commit.' },
          { title: 'Attempt integration', body: 'Merge updated main into the feature. Read the conflict message and run status.' },
          { title: 'Resolve intentionally', body: 'Open the file or VS Code Merge Editor, compare both versions, write the intended final heading, and remove all markers.' },
          { title: 'Validate and stage', body: 'Search for remaining markers, preview the page, stage the resolved file, and inspect staged diff.' },
          { title: 'Complete or abort', body: 'Commit the merge and push. To restart before committing, use git merge --abort and confirm status.' }
        ],
        commands: [
          cmd('Find conflict state', { powershell: 'git status', cmd: 'git status', gitbash: 'git status', zsh: 'git status', bash: 'git status' }, 'Lists unmerged paths and the operation in progress.'),
          cmd('Abort an unfinished practice merge', { powershell: 'git merge --abort', cmd: 'git merge --abort', gitbash: 'git merge --abort', zsh: 'git merge --abort', bash: 'git merge --abort' }, 'Returns to the pre-merge state when possible. Use only before completing the merge.')
        ],
        expected: 'No conflict markers remain, tests pass, status is clean after the merge commit, and the graph shows both parent histories.',
        practice: 'Resolve a conflict by combining useful text from both sides instead of choosing only one side.',
        mistakes: [mistake('Conflict markers appear on the website.', 'The file was staged without removing markers.', 'Reopen it, write the intended final content, search the repository for <<<<<<<, =======, and >>>>>>>, test, and commit the correction.')],
        visual: { type: 'conflict', title: 'Conflict resolution', nodes: ['Current version', 'Incoming version', 'Human chooses intent', 'Clean final file', 'Test + stage + commit'], alt: 'A human compares current and incoming versions, writes a clean intended result, then tests, stages, and commits it.' },
        quiz: q('What does a merge conflict mean?', ['Git needs a human decision', 'The repository is permanently broken', 'All work is deleted'], 0, 'Git preserved both possibilities and asks you to decide the intended result.', 'It is ambiguity, not destruction.', 'Should Accept All be used without reading?')
      }),
      L({
        id: 'environments-workflow', title: 'Development, test, and production workflows', duration: 30,
        outcome: 'Distinguish branches from environments and select a review-based promotion workflow.',
        prerequisites: ['pull-request'], terms: ['environment', 'branch'],
        explanation: ['An environment is where software runs. A branch is a Git history label. Teams may map branches to environments, but they are not inherently the same thing.', 'The recommended beginner model is feature → PR → main → automated deployment. Main stays deployable and branch protection requires review/checks.', 'Some teams use develop, staging/test, and main/production branches. If used, promotion should happen through PRs and automated checks—not by manually pushing unreviewed feature work through each branch.'],
        steps: [
          { title: 'Choose the project model', body: 'For the portfolio, use GitHub Flow: feature branches target main and merged main deploys.' },
          { title: 'Protect main', body: 'Configure rules requiring a pull request and successful checks where the GitHub plan/repository supports them.' },
          { title: 'Understand extended promotion', body: 'In the optional model, features target develop, an approved PR promotes to staging, and another approved PR promotes the exact tested work to main.' },
          { title: 'Synchronize correctly', body: 'A feature synchronizes from its current PR target, not automatically from every long-lived branch.' },
          { title: 'Prefer automation', body: 'Use checks to test the commit and deployment jobs to promote known commits to environments.' }
        ],
        expected: 'You can explain why “push feature to dev, test, and prod branches” is not a safe universal process.',
        practice: 'Draw both GitHub Flow and the optional extended workflow, labeling every required PR and environment deployment.',
        mistakes: [mistake('A feature was directly pushed to production.', 'Environment promotion and branch updates were treated as the same unreviewed action.', 'Stop deployment if possible, assess the exact commit, restore the last approved version, and route the correction through review/checks.')],
        visual: { type: 'flow', title: 'Portfolio delivery', nodes: ['feature/*', 'PR + checks', 'main', 'GitHub Pages production'], alt: 'A feature branch enters main through a reviewed pull request with checks, then main deploys to GitHub Pages production.' },
        quiz: q('Is a production environment inherently a Git branch?', ['No', 'Yes, always', 'Only on macOS'], 0, 'A branch records history; an environment is a runtime destination. A project may connect them by convention or automation.', 'Separate source history from runtime location.', 'What is the portfolio’s recommended workflow?')
      })
    ]
  },
  {
    id: 'toolkit', number: '7', title: 'Git toolkit & releases', description: 'Investigate, recover, maintain, tag, and automate.',
    lessons: [
      L({
        id: 'inspect-history', title: 'Diff, log, show, blame, and help', duration: 25,
        outcome: 'Investigate a repository without changing it and identify commits using references.',
        prerequisites: ['first-commit'], terms: ['commit', 'branch'],
        explanation: ['A commit hash identifies one snapshot. HEAD identifies the checked-out commit, HEAD~1 its first parent, and names such as main or v1.0.0 resolve to commits.', 'Use blame to find the commit responsible for each line so you can understand context—not to assign personal fault.', 'Git’s built-in help is version-matched documentation. Read usage and examples before trying unfamiliar options.'],
        steps: [
          { title: 'Compare states', body: 'Use ordinary diff for unstaged changes, --staged for staged changes, and named references for commits or branches.' },
          { title: 'Read graph history', body: 'Use the concise decorated graph, then inspect one selected commit with show.' },
          { title: 'Trace a line', body: 'Run blame on README, copy the relevant hash, and open it with show to learn why the line changed.' },
          { title: 'Ask Git for help', body: 'Run git help status or git status -h. Exit the full help viewer with q.' }
        ],
        commands: [
          cmd('Read the complete graph', { powershell: 'git log --oneline --graph --decorate --all', cmd: 'git log --oneline --graph --decorate --all', gitbash: 'git log --oneline --graph --decorate --all', zsh: 'git log --oneline --graph --decorate --all', bash: 'git log --oneline --graph --decorate --all' }, 'Read-only history view.'),
          cmd('Inspect the previous commit', { powershell: 'git show HEAD~1', cmd: 'git show HEAD~1', gitbash: 'git show HEAD~1', zsh: 'git show HEAD~1', bash: 'git show HEAD~1' }, 'Shows metadata and patch for the first parent of HEAD.'),
          cmd('Open command help', { powershell: 'git help status', cmd: 'git help status', gitbash: 'git help status', zsh: 'git help status', bash: 'git help status' }, 'Opens documentation installed with Git.')
        ],
        expected: 'You can locate a change, identify its commit, and read command help without modifying history.',
        practice: 'Find the commit that introduced .gitignore and explain its message and changed paths.',
        mistakes: [mistake('git blame is used to criticize an author.', 'The investigation tool was treated as a people-management score.', 'Use the identified commit to understand context, decisions, and related history; review work rather than attacking a person.')],
        visual: { type: 'git-graph', title: 'Names resolve to commits', nodes: ['A ← HEAD~2', 'B ← HEAD~1', 'C ← HEAD, main, v1.0.0'], alt: 'Commit C can be identified by HEAD, main, or a tag while parent references identify earlier commits.' },
        quiz: q('What does git show normally do?', ['Displays a commit and its change', 'Publishes a repository', 'Deletes a branch'], 0, 'Show is an inspection command for Git objects such as commits and tags.', 'It is read-only investigation.', 'Why use blame carefully?')
      }),
      L({
        id: 'advanced-recovery', title: 'Reflog, detached HEAD, reset, and advanced safety', duration: 35,
        outcome: 'Recover a lost practice commit and recognize operations that rewrite unpublished history.',
        prerequisites: ['inspect-recover', 'inspect-history'], terms: ['commit', 'branch'],
        explanation: ['The reflog records recent movements of local references and HEAD. It is local and eventually expires, so it is a recovery aid—not a backup.', 'Detached HEAD means HEAD points directly to a commit rather than a branch. New work can be preserved by creating a branch before switching away.', 'Reset modes and force updates can discard or replace reachable work. Practice only in a disposable repository. Prefer --force-with-lease over --force when team policy explicitly requires an update because it checks expected remote state.'],
        steps: [
          { title: 'Create a disposable lab', body: 'Do not use the capstone. Create three small commits in a new practice repository.' },
          { title: 'Observe detached HEAD', body: 'Switch to the first commit, inspect status, make no important edits, then return to main.' },
          { title: 'Preserve detached work', body: 'Repeat, create a harmless commit, then immediately create a branch pointing to it.' },
          { title: 'Recover with reflog', body: 'Move a practice branch, inspect reflog, identify the earlier hash, and create recovery-found at that hash.' },
          { title: 'Compare reset modes', body: 'Use a supplied impact table: soft moves the branch while keeping changes staged; mixed keeps them unstaged; hard replaces working/index content. Do not use hard outside the disposable lab.' }
        ],
        commands: [
          cmd('Inspect local reference movements', { powershell: 'git reflog', cmd: 'git reflog', gitbash: 'git reflog', zsh: 'git reflog', bash: 'git reflog' }, 'Shows recent local HEAD movements.'),
          cmd('Preserve a recovered commit', { powershell: 'git branch recovery-found <commit-hash>', cmd: 'git branch recovery-found <commit-hash>', gitbash: 'git branch recovery-found <commit-hash>', zsh: 'git branch recovery-found <commit-hash>', bash: 'git branch recovery-found <commit-hash>' }, 'Creates a branch label at the recovered hash without changing files.')
        ],
        expected: 'A recovered branch points to the practice commit, and you can explain why reflog is local and reset --hard is dangerous.',
        practice: 'Write a recovery decision for unstaged, staged, local committed, and shared committed work before using any command.',
        mistakes: [mistake('A detached commit seems lost after switching.', 'No branch label preserved it.', 'Inspect reflog promptly, find the commit, and create a branch at its hash.')],
        visual: { type: 'decision', title: 'Preserve recovery', nodes: ['Find hash in reflog', 'Inspect with show', 'Create branch at hash', 'Verify files', 'Continue safely'], alt: 'Find and inspect the lost commit, create a branch label at it, verify content, and only then continue.' },
        quiz: q('Is reflog a shared GitHub backup?', ['No, it is local and temporary', 'Yes', 'Only for tags'], 0, 'Reflog records local reference movement and is not pushed.', 'It belongs to one clone.', 'How do you preserve a detached commit?')
      }),
      L({
        id: 'tags-releases', title: 'Tags, semantic versions, and releases', duration: 28,
        outcome: 'Create an annotated version tag and publish a GitHub release without moving old tags.',
        prerequisites: ['pull-request'], terms: ['commit'],
        explanation: ['A tag gives a stable name to a specific commit. Annotated tags include tagger information and a message, making them suitable for releases.', 'Semantic versions communicate breaking, feature, and fix changes as MAJOR.MINOR.PATCH. v1.0.0 is the first stable course release; v1.1.0 adds compatible functionality; v1.1.1 fixes it.', 'Published tags should be treated as immutable. Correct mistakes with a new version rather than silently moving a tag others may have fetched.'],
        steps: [
          { title: 'Select the release commit', body: 'Update main, confirm a clean tree, run tests, and inspect HEAD.' },
          { title: 'Create an annotated tag', body: 'Tag the exact approved commit with v1.0.0 and a useful message.' },
          { title: 'Inspect and push', body: 'Show the tag, then push that tag explicitly to origin.' },
          { title: 'Create the release', body: 'On GitHub create a release from v1.0.0. Summarize user-visible work and link the live site.' },
          { title: 'Plan the next version', body: 'A compatible new portfolio section is minor; a corrected link is patch.' }
        ],
        commands: [
          cmd('Create an annotated release tag', { powershell: 'git tag -a v1.0.0 -m "First public portfolio release"', cmd: 'git tag -a v1.0.0 -m "First public portfolio release"', gitbash: 'git tag -a v1.0.0 -m "First public portfolio release"', zsh: 'git tag -a v1.0.0 -m "First public portfolio release"', bash: 'git tag -a v1.0.0 -m "First public portfolio release"' }, '-a creates an annotated tag at HEAD.'),
          cmd('Inspect and publish the tag', { powershell: 'git show v1.0.0\ngit push origin v1.0.0', cmd: 'git show v1.0.0\ngit push origin v1.0.0', gitbash: 'git show v1.0.0\ngit push origin v1.0.0', zsh: 'git show v1.0.0\ngit push origin v1.0.0', bash: 'git show v1.0.0\ngit push origin v1.0.0' }, 'Inspect before pushing the one named tag.')
        ],
        expected: 'GitHub lists v1.0.0 at the intended commit with clear release notes.',
        practice: 'Classify three changes as major, minor, or patch and explain why.',
        mistakes: [mistake('The tag points to the wrong commit but is already public.', 'It was created before selecting/verifying the release commit.', 'Do not silently move it. Assess whether to publish a corrected new version and document the superseded release.')],
        visual: { type: 'git-graph', title: 'Stable release pointer', nodes: ['A—B—C main', '    ↑ v1.0.0', 'Later main moves; v1.0.0 stays at C'], alt: 'The release tag remains attached to commit C even as main advances.' },
        quiz: q('What version normally represents a compatible bug fix after v1.1.0?', ['v1.1.1', 'v2.0.0', 'Move v1.1.0'], 0, 'A compatible fix increments the patch component.', 'MAJOR.MINOR.PATCH.', 'Should a published tag be casually moved?')
      }),
      L({
        id: 'automation-health', title: 'Repository health and GitHub Actions', duration: 30,
        outcome: 'Recognize healthy repository files and read a basic continuous-integration workflow safely.',
        prerequisites: ['pull-request'], terms: ['repository', 'continuous_integration'],
        explanation: ['README explains the project, LICENSE grants permissions, CONTRIBUTING describes participation, CODE_OF_CONDUCT sets community expectations, SECURITY provides private reporting guidance, and CODEOWNERS can request responsible reviewers.', 'Continuous integration runs automated validation for commits or pull requests. A GitHub Actions workflow declares triggers, permissions, jobs, runners, and steps in YAML.', 'Workflow code can access repository data and sometimes secrets. Minimize permissions, pin trusted actions, never print secrets, and treat untrusted pull-request code carefully.'],
        steps: [
          { title: 'Add repository guidance', body: 'Create accurate README, LICENSE, contributing, conduct, and security files appropriate to the project.' },
          { title: 'Create validation workflow', body: 'Add .github/workflows/validate.yml. Trigger it for pull requests and pushes to main, grant read-only contents permission, set up Node, and run npm test.' },
          { title: 'Read Pages workflow structure', body: 'Identify name, trigger, explicit permissions, concurrency, jobs, runner, artifact upload, environment, and deployment step in pages.yml.' },
          { title: 'Require checks', body: 'Where supported, make validation a required pull-request check before merge.' },
          { title: 'Review dependency signals', body: 'Understand security alerts and automated dependency PRs before merging them.' },
          { title: 'Recognize optional tools', body: 'Git hooks are local unless a project distributes setup; signed commits/tags add identity evidence; Git LFS stores pointers for appropriate large binary assets.' }
        ],
        commands: [
          cmd('Run workflow validation locally', { powershell: 'npm test', cmd: 'npm test', gitbash: 'npm test', zsh: 'npm test', bash: 'npm test' }, 'Local development and Actions use the same validator so failures can be reproduced before pushing.', 'All repository validation checks passed.'),
          cmd('Inspect the Pages workflow', { powershell: 'Get-Content .github/workflows/pages.yml', cmd: 'type .github\\workflows\\pages.yml', gitbash: 'cat .github/workflows/pages.yml', zsh: 'cat .github/workflows/pages.yml', bash: 'cat .github/workflows/pages.yml' }, 'Read the workflow before enabling it. Confirm triggers, permissions, artifact, environment, and deployment action.')
        ],
        expected: 'You can explain each repository health file, what each workflow runs, when it runs, and how to reproduce validation locally.',
        practice: 'Review the project Pages workflow and list its permissions and deployment trigger.',
        mistakes: [mistake('A workflow printed a token.', 'Secret handling was unsafe.', 'Revoke/rotate the secret, remove logging, review workflow permissions and logs, and follow incident policy.')],
        visual: { type: 'flow', title: 'Automated quality gate', nodes: ['Push / PR', 'Workflow trigger', 'Validation job', 'Required check', 'Review + merge', 'Deploy'], alt: 'A push or pull request triggers validation; passing required checks and review allows merge and deployment.' },
        quiz: q('Are ordinary local Git hooks automatically installed by clone?', ['No', 'Yes, always', 'Only on GitHub Pages'], 0, 'Hooks in .git are local; teams need an explicit supported distribution/setup approach.', 'The .git directory is not cloned as project content.', 'Why minimize workflow permissions?')
      })
    ]
  },
  {
    id: 'markdown-web', number: '8', title: 'Markdown & web foundations', description: 'Document and build a real accessible website.',
    lessons: [
      L({
        id: 'markdown', title: 'Write useful Markdown', duration: 28,
        outcome: 'Create a readable, portable project README using core Markdown syntax.',
        terms: ['markdown'],
        explanation: ['Markdown is plain text with lightweight formatting marks. It remains readable in source, produces clear Git diffs, works across tools, and renders natively on GitHub.', 'Headings create document structure, not merely large text. Use one page title, descend levels in order, and write meaningful link text.', 'Relative links and image paths travel with the repository. Absolute web links point to external locations.'],
        steps: [
          { title: 'Create structure', body: 'Use # for the title, ## for major sections, paragraphs, and lists.' },
          { title: 'Add references', body: 'Add a meaningful link, an image with useful alt text, inline code, and a fenced command example.' },
          { title: 'Add project information', body: 'Include purpose, live demo, screenshot, features, technologies, setup, usage, accessibility, license, and contact links.' },
          { title: 'Preview and inspect', body: 'Use VS Code Markdown preview, then review the GitHub rendering and changed-lines diff.' }
        ],
        commands: [cmd('Open Markdown preview in VS Code', { powershell: 'code README.md', cmd: 'code README.md', gitbash: 'code README.md', zsh: 'code README.md', bash: 'code README.md' }, 'Open the file, then use the “Markdown: Open Preview” Command Palette action or preview button.')],
        expected: 'README source is understandable as plain text and renders with ordered headings, links, code, and image alternatives.',
        practice: 'Document one portfolio project with a problem, your approach, result, and what you learned.',
        mistakes: [mistake('An image renders locally but not on GitHub.', 'The relative path or letter case differs.', 'Compare the exact repository path and case; use forward-slash relative paths in Markdown.')],
        visual: { type: 'split', title: 'Markdown source and result', nodes: ['# My Portfolio → page title', '[Live site](https://…) → link', '`git status` → inline code'], alt: 'Markdown symbols transform readable source into headings, links, and formatted code.' },
        quiz: q('Why is Markdown suitable for Git documentation?', ['It is readable text with clear diffs', 'It hides all history', 'It requires a database'], 0, 'Markdown source remains readable and version-control friendly.', 'Consider plain-text changes.', 'What should image alt text communicate?')
      }),
      L({
        id: 'how-web-works', title: 'How websites work', duration: 18,
        outcome: 'Explain how a browser obtains a page and the roles of HTML, CSS, and JavaScript.',
        terms: ['browser'],
        explanation: ['A browser requests a URL. A server responds with files. The browser parses HTML, applies CSS, and runs allowed JavaScript.', 'HTML provides structure and meaning. CSS controls presentation and layout. JavaScript adds behavior. A local file can be previewed on your computer; hosting makes it reachable through a web URL.', 'GitHub Pages hosts static files. It does not run a normal custom backend or protect secrets placed in client files.'],
        steps: [
          { title: 'Follow a request', body: 'Enter a URL, observe the address/domain/path, and identify the response page.' },
          { title: 'Open a local page', body: 'Open index.html through a local HTTP server and compare localhost with the later GitHub Pages address.' },
          { title: 'Inspect developer tools', body: 'Open Elements, Console, and Network. Do not paste code into the console from strangers.' },
          { title: 'Map technologies', body: 'Identify structure in HTML, styling in CSS, and interaction in JavaScript.' }
        ],
        expected: 'You can describe browser request, server response, and the three front-end technologies.',
        practice: 'Use developer tools to locate the page h1 and identify the CSS rule that colors it.',
        mistakes: [mistake('A secret API key was placed in JavaScript.', 'Browser-delivered code is public to visitors.', 'Revoke/rotate the key and move privileged operations to an appropriate secure service; static Pages cannot hide it.')],
        visual: { type: 'flow', title: 'A web request', nodes: ['Browser URL', 'HTTP request', 'Web host', 'HTML/CSS/JS response', 'Rendered page'], alt: 'The browser sends a request to a web host, receives HTML, CSS, and JavaScript, and renders the page.' },
        quiz: q('Which technology gives a page its semantic structure?', ['HTML', 'CSS', 'Git tags'], 0, 'HTML describes the document and its meaning.', 'CSS presents; JavaScript behaves.', 'Can client-side JavaScript safely hide a secret?')
      }),
      L({
        id: 'html', title: 'Build semantic HTML', duration: 35,
        outcome: 'Create a valid, accessible portfolio structure with meaningful landmarks and content.',
        prerequisites: ['how-web-works'],
        explanation: ['index.html is the conventional default page. A complete document declares HTML, language, character encoding, viewport, title, and body.', 'Semantic elements such as header, nav, main, section, article, and footer communicate structure to browsers and assistive technology.', 'Images need context-sensitive alternative text. Links need meaningful names. Form controls require labels. Heading levels must describe hierarchy.'],
        steps: [
          { title: 'Create document metadata', body: 'Add doctype, html lang, charset, viewport, descriptive title, and description.' },
          { title: 'Add landmarks', body: 'Build header and navigation, one main containing introduction, about, skills, and projects, then footer.' },
          { title: 'Create project cards', body: 'Use article elements, ordered headings, descriptions, technology lists, and descriptive project/live/source links.' },
          { title: 'Add accessible media', body: 'Use appropriately sized images, width/height, accurate alt text, and captions where useful.' },
          { title: 'Validate', body: 'Use a standards-based HTML validator and fix errors rather than suppressing them.' }
        ],
        expected: 'The page has one clear h1, ordered sections, landmarks, keyboard-reachable links, and valid markup.',
        practice: 'Navigate the page using only headings and landmarks in a screen-reader or accessibility-tree inspector.',
        mistakes: [mistake('The browser cannot find an image on Pages.', 'Path case or base-relative syntax is wrong.', 'Use an exact relative path such as images/project.svg and match repository letter case.')],
        visual: { type: 'tree', title: 'Semantic page outline', nodes: ['body', '  header + nav', '  main', '    section: about', '    section: projects', '      article: project', '  footer'], alt: 'The body contains header and navigation, a main with sections and project articles, and a footer.' },
        quiz: q('Which element should contain the page’s unique primary content?', ['main', 'style', 'meta'], 0, 'The main landmark identifies the central content of the page.', 'Think in page landmarks.', 'Why declare the page language?')
      }),
      L({
        id: 'css', title: 'Style responsively with CSS', duration: 40,
        outcome: 'Create a mobile-first, readable layout with visible focus and reduced-motion support.',
        prerequisites: ['html'],
        explanation: ['A CSS rule combines selectors with declarations. The cascade, inheritance, source order, and specificity decide which declaration applies.', 'The box model includes content, padding, border, and margin. Flexbox lays out one dimension; Grid handles rows and columns.', 'Start with narrow screens, then add media queries when content needs more space. Do not remove focus outlines without an equally visible replacement. Do not rely on color alone.'],
        steps: [
          { title: 'Define foundations', body: 'Set box-sizing, readable fonts, colors with sufficient contrast, line height, and spacing variables.' },
          { title: 'Style components', body: 'Create navigation, buttons, sections, and project cards with consistent states.' },
          { title: 'Build layout', body: 'Use Grid for project cards and Flexbox for navigation. Allow wrapping and avoid fixed content heights.' },
          { title: 'Add responsive changes', body: 'Test narrow first, then add a breakpoint based on actual content pressure.' },
          { title: 'Respect users', body: 'Add :focus-visible, hover that is not required for access, and prefers-reduced-motion handling.' }
        ],
        expected: 'The portfolio works at phone and desktop widths, zooms to 200%, shows keyboard focus, and avoids horizontal page scrolling.',
        practice: 'Test at 320px, 768px, and a desktop width; record and fix one layout problem found at each.',
        mistakes: [mistake('Content is cut off on small screens.', 'A fixed width or non-wrapping row exceeds the viewport.', 'Use max-width: 100%, flexible tracks, wrapping, and content-driven breakpoints.')],
        visual: { type: 'responsive', title: 'Mobile-first layout', nodes: ['One column by default', 'Content needs room', '@media breakpoint', 'Multiple columns'], alt: 'Begin with one column and introduce more columns only when available space and content support them.' },
        quiz: q('When should a responsive breakpoint be added?', ['When content needs a layout change', 'For every device model', 'Only after publishing'], 0, 'Content-driven breakpoints are more durable than targeting individual devices.', 'Observe layout pressure.', 'What must replace a removed focus outline?')
      }),
      L({
        id: 'javascript-quality', title: 'Add JavaScript and test quality', duration: 40,
        outcome: 'Add one progressive enhancement and complete accessibility, performance, link, and privacy checks.',
        prerequisites: ['css'],
        explanation: ['JavaScript values can be stored in variables, organized in arrays/objects, processed by functions, and changed in response to events.', 'Progressive enhancement means essential content and navigation work without JavaScript; the script improves the experience.', 'Quality includes keyboard access, responsive behavior, no console errors, valid links, optimized images, accurate metadata, appropriate licenses, and no private data.'],
        steps: [
          { title: 'Select elements', body: 'Use stable IDs or data attributes and querySelector. Check that a result exists before using it.' },
          { title: 'Add a useful event', body: 'Create an accessible project filter or menu toggle. Update aria-expanded when disclosure state changes.' },
          { title: 'Handle failure', body: 'Disable JavaScript temporarily and verify core content and links still work.' },
          { title: 'Debug deliberately', body: 'Create then fix one controlled console error. Use the filename and line number.' },
          { title: 'Run quality checks', body: 'Test keyboard, zoom, contrast, reduced motion, links, images, viewport sizes, console, metadata, file sizes, and privacy.' }
        ],
        expected: 'The enhancement is keyboard accessible, state is communicated, core content works without it, and the console is clean.',
        practice: 'Implement project filtering with buttons that expose pressed/selected state and retain all projects when JavaScript is unavailable.',
        mistakes: [mistake('A click works but keyboard users cannot activate the control.', 'A non-interactive element was used as a button.', 'Use a real button element and preserve its native keyboard behavior and focus.')],
        visual: { type: 'flow', title: 'Progressive enhancement', nodes: ['Useful HTML', '+ readable CSS', '+ optional JavaScript behavior', 'Test without each layer'], alt: 'Begin with useful HTML, add CSS presentation, then optional JavaScript behavior, testing the page as layers are added.' },
        quiz: q('What should happen when optional JavaScript fails?', ['Core content remains usable', 'The entire page disappears', 'Secrets become visible'], 0, 'Progressive enhancement preserves essential content and actions.', 'HTML is the durable foundation.', 'Why prefer a button over a clickable div?')
      })
    ]
  },
  {
    id: 'capstone', number: '9', title: 'Publish your portfolio', description: 'Plan, build, deploy, release, and maintain your public work.',
    lessons: [
      L({
        id: 'sdlc', title: 'Use a practical software development lifecycle', duration: 25,
        outcome: 'Connect requirements, planning, design, development, testing, deployment, and operations through visible gates and feedback.',
        prerequisites: ['javascript-quality'], terms: ['environment'],
        explanation: ['The software development lifecycle (SDLC) organizes work from a need through a maintained product. It is a feedback loop, not a one-way document assembly line.', 'Each stage creates evidence: requirements and acceptance criteria; plan and tracker; architecture/content design; reviewed implementation; test report; deployment record; monitoring, issues, and releases.', 'Small projects can use lightweight documents, but still benefit from explicit decisions, owners, quality gates, and traceable changes.'],
        steps: [
          { title: 'Requirements gate', body: 'Define audience, outcomes, scope, risks, functional requirements, quality requirements, and acceptance criteria.' },
          { title: 'Planning and design gate', body: 'Break work into dependency-ordered tasks, identify parallel-safe files, choose architecture, and freeze data/interaction contracts.' },
          { title: 'Development gate', body: 'Implement one scoped issue on a feature branch with focused commits, self-review, and target synchronization.' },
          { title: 'Testing gate', body: 'Run automated validation plus accessibility, browser, cross-platform, security, and learner-flow checks. Record evidence and defects.' },
          { title: 'Deployment gate', body: 'Merge approved work, deploy the exact commit through automation, verify production, and retain logs.' },
          { title: 'Operations feedback', body: 'Monitor failures, content freshness, domains, security, feedback, and releases; route improvements into requirements and issues.' }
        ],
        expected: 'Every capstone change maps to an artifact, responsible role, review gate, and feedback path.',
        practice: 'Follow docs/00_documentation_index.md and map one portfolio feature through every SDLC stage.',
        mistakes: [mistake('Deployment is treated as the end of the project.', 'Operations and feedback were omitted.', 'Add monitoring, maintenance ownership, issue intake, security response, content reviews, and a next-release loop.')],
        visual: { type: 'flow', title: 'SDLC feedback loop', nodes: ['Requirements', 'Plan + design', 'Develop', 'Test', 'Deploy', 'Operate', 'Feedback → requirements'], alt: 'Requirements lead to planning and design, development, testing, deployment, and operations; feedback returns to requirements.' },
        quiz: q('What comes after deployment in a complete SDLC?', ['Operations, feedback, and maintenance', 'Delete the repository', 'Stop testing forever'], 0, 'Production must be monitored and maintained, and feedback informs future requirements.', 'A product continues after launch.', 'Which stage defines acceptance criteria?')
      }),
      L({
        id: 'plan-portfolio', title: 'Plan the capstone', duration: 30,
        outcome: 'Define audience, content, issues, branch work, quality rules, and a code-based wireframe before building.',
        prerequisites: ['markdown', 'sdlc'], terms: ['repository'],
        explanation: ['A portfolio is evidence for a specific audience. Each project should explain the problem, your contribution, decisions, outcome, and learning—not only list technologies.', 'Plan small issues with acceptance criteria. Implement each meaningful unit on a feature branch and merge it through review.', 'Decide privacy boundaries before publishing: use professional contact links, not sensitive addresses, phone numbers, private client data, or secrets.'],
        steps: [
          { title: 'Define purpose', body: 'Write one sentence naming audience and action: for example, help hiring managers evaluate front-end projects.' },
          { title: 'Inventory content', body: 'Prepare introduction, about, skills, two or more projects, evidence/screenshots, and contact links.' },
          { title: 'Create issues', body: 'Create issues for structure, styling, projects, documentation, quality, and deployment. Add acceptance criteria.' },
          { title: 'Draw the wireframe', body: 'Use a text tree: header/navigation, main sections, project grid, and footer. Order content by audience need.' },
          { title: 'Define done', body: 'Require responsive layouts, keyboard access, visible focus, meaningful links, optimized media, clean console, reviewed PRs, and no private data.' }
        ],
        expected: 'The repository has a content plan, wireframe, scoped issues, and testable completion criteria.',
        practice: 'Ask another person to read the plan and state what the portfolio proves within 30 seconds.',
        mistakes: [mistake('The portfolio contains generic placeholders at launch.', 'Content planning was deferred until after layout.', 'Return to the inventory, replace every placeholder with accurate evidence, and review privacy before deployment.')],
        visual: { type: 'wireframe', title: 'Portfolio page', nodes: ['Header + navigation', 'Intro: value statement', 'About + skills', 'Project evidence grid', 'Contact + footer'], alt: 'A portfolio wireframe ordered from navigation and value statement through evidence projects and contact details.' },
        quiz: q('What should a project case study emphasize?', ['Problem, contribution, decisions, outcome, and learning', 'Only a technology list', 'Private client credentials'], 0, 'Evidence and decision-making help readers evaluate the work.', 'Explain impact and ownership.', 'Why define done before coding?')
      }),
      L({
        id: 'build-capstone', title: 'Build through issues, branches, and PRs', duration: 75,
        outcome: 'Construct the portfolio through an auditable feature workflow while keeping main deployable.',
        prerequisites: ['plan-portfolio', 'pull-request'], terms: ['branch', 'pull_request'],
        explanation: ['Each issue should produce a reviewable result. A branch name connects work to intent; commits explain steps; the PR demonstrates testing and discussion.', 'Keep main deployable. Synchronize each active feature from its target before final review. Avoid mixing unrelated formatting, content, and behavior into one huge commit.', 'The final repository should contain index.html, CSS, optional JavaScript, optimized images, README, license, gitignore, and contribution/security guidance appropriate to a public project.'],
        steps: [
          { title: 'Build semantic structure', body: 'Create feature/site-structure, implement HTML and content, test, open a PR, review, and merge.' },
          { title: 'Build visual design', body: 'Update main, create feature/responsive-styles, implement mobile-first CSS and focus states, then review and merge.' },
          { title: 'Add project evidence', body: 'Use feature/project-case-studies for accurate text, optimized images, links, and attribution.' },
          { title: 'Add enhancement', body: 'Use a separate branch for optional JavaScript. Test without JavaScript before merging.' },
          { title: 'Document and audit', body: 'Complete README and license, then perform keyboard, zoom, responsive, link, console, performance, metadata, and privacy checks.' },
          { title: 'Final release PR', body: 'Synchronize, require checks, self-review the complete diff, obtain review when possible, and merge into main.' }
        ],
        expected: 'Main contains a complete, tested portfolio built from focused reviewed branches and documented by a professional README.',
        practice: 'Use the course capstone validator and resolve every failing item before deployment.',
        mistakes: [mistake('The PR is too large to review confidently.', 'Unrelated tasks were combined.', 'Split future work by issue. For current work, document sections, review commit-by-commit where useful, and avoid mixing additional changes.')],
        visual: { type: 'flow', title: 'Capstone delivery loop', nodes: ['Issue', 'Update target', 'Feature branch', 'Small commits', 'Self-test', 'PR + checks', 'Review', 'Merge'], alt: 'Each capstone issue follows target update, feature branch, focused commits, testing, pull request checks, review, and merge.' },
        quiz: q('What condition should main maintain?', ['Deployable and reviewed', 'Always incomplete', 'Full of uncommitted files'], 0, 'A protected deployable main supports reliable releases.', 'Main is the delivery source.', 'When should a feature synchronize with its target?')
      }),
      L({
        id: 'github-pages', title: 'Deploy with GitHub Pages', duration: 40,
        outcome: 'Publish the portfolio, verify its URL and deployment, then diagnose common path and build failures.',
        prerequisites: ['build-capstone', 'automation-health'], terms: ['environment'],
        explanation: ['GitHub Pages serves static files from a configured source or Actions workflow. A user site commonly uses username.github.io; a project site commonly uses username.github.io/repository-name/.', 'Project sites have a base path. Use relative asset links and exact letter case. Windows may hide case mistakes that fail on Linux-based hosting.', 'Deployment is successful only after the workflow/build succeeds and the public URL loads the expected commit.'],
        steps: [
          { title: 'Pre-deploy audit', body: 'Confirm repository visibility/settings, index.html at the expected root, relative paths, exact case, no secrets, and passing checks.' },
          { title: 'Configure Pages', body: 'In repository Settings > Pages, select the course-supported GitHub Actions workflow or approved branch source. Current labels may change; verify GitHub’s displayed source and URL.' },
          { title: 'Observe deployment', body: 'Open Actions/deployments, inspect the commit, wait for success, and follow the environment URL.' },
          { title: 'Verify publicly', body: 'Use a private browser window, test navigation, images, responsive layout, console, keyboard, and README live link.' },
          { title: 'Troubleshoot methodically', body: 'Check workflow logs, missing index.html, case mismatch, absolute / paths, wrong source branch, repository visibility policy, and browser cache.' },
          { title: 'Connect discovery', body: 'Add the live URL to the repository About area and README.' }
        ],
        expected: 'The public Pages URL loads the tested portfolio and is linked from the repository.',
        practice: 'Change one harmless sentence through a feature PR, merge it, observe redeployment, and verify the exact commit reached production.',
        mistakes: [
          mistake('CSS works locally but is missing online.', 'An absolute root path or wrong letter case fails under the project-site base path.', 'Use a relative path such as css/styles.css and match the repository’s exact case.'),
          mistake('Pages shows 404.', 'The source lacks index.html at the expected location or deployment failed.', 'Inspect Pages source settings and workflow logs, confirm index.html location, then redeploy the corrected commit.')
        ],
        visual: { type: 'flow', title: 'Pages deployment', nodes: ['Merge to main', 'Actions workflow', 'Validate/build artifact', 'Deploy to Pages', 'Public URL', 'Verify exact commit'], alt: 'A merge to main triggers validation and creates an artifact, deploys it to Pages, and requires public verification.' },
        quiz: q('Why can /css/styles.css fail on a project Pages site?', ['It starts at the domain root instead of the repository base path', 'CSS is unsupported', 'Git removes colors'], 0, 'A leading slash refers to the domain root. Relative paths travel correctly under a project base path.', 'Project sites live below /repository-name/.', 'What should you inspect when deployment fails?')
      }),
      L({
        id: 'custom-domain', title: 'Register and map custom domains', duration: 40,
        outcome: 'Register a domain securely and map one or multiple GitHub Pages repositories using verified DNS and HTTPS.',
        prerequisites: ['github-pages'], terms: ['dns', 'environment'],
        explanation: ['A registrar records domain ownership; a DNS provider publishes records that direct hostnames to services. Compare renewal price, privacy, transfer policy, support, DNS controls, and account security—not only first-year price.', 'A practical multi-repository design uses the apex for a main site and one subdomain per repository: example.com, git.example.com, portfolio.example.com, and docs.example.com.', 'Verify the apex domain in GitHub with its supplied TXT record to reduce takeover risk. For subdomains use CNAME to <owner>.github.io. For the apex use GitHub’s current documented A and optional AAAA values; do not copy stale IPs from old tutorials.'],
        steps: [
          { title: 'Register securely', body: 'Buy the domain in an account you control. Enable MFA, registrar lock, privacy where available, renewal reminders, and preferably auto-renew.' },
          { title: 'Plan hostnames', body: 'Choose one canonical main hostname and unique subdomains for repository sites. DNS cannot route a CNAME to a URL path.' },
          { title: 'Verify ownership', body: 'In GitHub account or organization Pages settings, add the apex domain and publish the exact TXT challenge. Leave it in DNS after verification.' },
          { title: 'Map a repository subdomain', body: 'Create git CNAME <owner>.github.io, then set git.example.com in that repository’s Pages custom-domain field.' },
          { title: 'Map apex and www', body: 'Use GitHub’s current official apex A/AAAA records and a www CNAME. Avoid conflicting records at the same hostname.' },
          { title: 'Verify and secure', body: 'Check public DNS, successful Pages DNS status, correct repository, certificate hostname, redirects, and assets. Enable Enforce HTTPS when available.' },
          { title: 'Operate safely', body: 'Monitor renewal and certificates, retain verification TXT, avoid unnecessary wildcards, and remove DNS before deleting or transferring a claimed repository.' }
        ],
        commands: [
          cmd('Inspect DNS on Windows', { powershell: 'Resolve-DnsName git.example.com -Type CNAME\nResolve-DnsName example.com -Type A', cmd: 'nslookup -type=CNAME git.example.com\nnslookup -type=A example.com' }, 'Replace example.com. The subdomain should resolve toward <owner>.github.io and apex should show current GitHub Pages addresses.'),
          cmd('Inspect DNS on macOS or Linux', { gitbash: 'nslookup -type=CNAME git.example.com', zsh: 'dig git.example.com CNAME\ndig example.com A', bash: 'dig git.example.com CNAME\ndig example.com A' }, 'Use an available DNS query tool and replace the example hostnames.')
        ],
        expected: 'Each selected hostname serves exactly one intended repository over HTTPS, and GitHub shows verified domain and DNS status.',
        practice: 'Create a mapping table for three repositories, including hostname, repository, DNS type/value, Pages setting, verification, HTTPS, and owner.',
        mistakes: [
          mistake('The CNAME target contains https:// or /repository.', 'A DNS record was given a URL instead of a hostname.', 'Set the target to <owner>.github.io only; configure the intended repository in GitHub Pages settings.'),
          mistake('A deleted repository hostname still points to GitHub.', 'A dangling DNS record was left behind.', 'Remove the DNS record and custom-domain association during decommissioning to reduce takeover risk.')
        ],
        visual: { type: 'remote', title: 'One domain, several repositories', nodes: ['example.com → main-site repo', 'git.example.com → learn-git repo', 'portfolio.example.com → portfolio repo', 'docs.example.com → docs repo'], alt: 'The apex domain maps to the main site while separate subdomains map to individual GitHub Pages repositories.' },
        quiz: q('What should a subdomain CNAME target contain?', ['<owner>.github.io only', 'https://github.com/owner/repo', 'A GitHub password'], 0, 'DNS CNAME values are hostnames, not URLs or paths.', 'DNS resolves names rather than repository URL paths.', 'Why retain the GitHub verification TXT record?')
      }),
      L({
        id: 'release-maintain', title: 'Release and maintain production', duration: 30,
        outcome: 'Tag the public release, document it, deliver a maintenance change, and plan responsible next steps.',
        prerequisites: ['custom-domain', 'tags-releases'], terms: ['environment', 'tag'],
        explanation: ['A production release connects an approved commit, deployment, tag, release notes, and public verification.', 'Maintenance uses the same workflow as initial development: issue, branch, focused commit, test, PR, review, merge, deploy, verify, then version appropriately.', 'Custom domains require DNS and HTTPS configuration. Analytics require a privacy decision. Automated accessibility/performance checks supplement rather than replace manual tests.'],
        steps: [
          { title: 'Record v1.0.0', body: 'At the deployed commit, create and push the annotated tag, then create release notes with the live URL and known limitations.' },
          { title: 'Create a maintenance issue', body: 'Choose a realistic fix such as a broken project link and define expected behavior.' },
          { title: 'Deliver the fix', body: 'Update main, create fix/project-link, implement and test, open a PR, pass checks, and merge.' },
          { title: 'Verify production', body: 'Observe Pages deployment and test the corrected link publicly.' },
          { title: 'Publish patch release', body: 'Tag the verified correction v1.0.1 and write concise release notes.' },
          { title: 'Choose next steps', body: 'Optionally configure a custom domain, improve automation, add projects, or learn a framework—without weakening the static accessible foundation.' }
        ],
        expected: 'v1.0.0 and v1.0.1 identify verified deployments, and the maintenance history is visible through issue, branch, PR, and release.',
        practice: 'Explain your complete delivery process to another learner using the repository graph and live deployment history.',
        mistakes: [mistake('A tag was created before public verification.', 'Release recording occurred before deployment was confirmed.', 'Verify the tagged commit and production state. If incorrect and public, document and issue a corrected version instead of silently moving the tag.')],
        visual: { type: 'flow', title: 'Production maintenance', nodes: ['Issue', 'Fix branch', 'PR + checks', 'Merge', 'Deploy', 'Verify', 'v1.0.1 release'], alt: 'A maintenance issue becomes a fix branch, reviewed merge, deployment, verification, and patch release.' },
        quiz: q('What should happen before tagging a production fix?', ['The exact deployed commit is tested and verified', 'Delete old history', 'Force push main'], 0, 'A release tag should identify known, verified production code.', 'Tags record approved releases.', 'What version follows v1.0.0 for a compatible fix?')
      })
    ]
  },
  {
    id: 'reference', number: '10', title: 'Advanced reference', description: 'Recognize specialist tools and troubleshoot methodically.',
    lessons: [
      L({
        id: 'advanced-git', title: 'Rebase, cherry-pick, bisect, clean, and large projects', duration: 40,
        outcome: 'Recognize advanced Git tools, their appropriate use, and their risks without applying them blindly.',
        prerequisites: ['advanced-recovery'], terms: ['commit', 'branch'],
        explanation: ['Rebase copies commits onto a new base and changes their hashes. It can create a linear story but requires coordination for published work. Interactive rebase can reorder, combine, or edit unpublished commits.', 'Cherry-pick applies one selected commit to the current branch. It is useful for a specific backport, not normal branch synchronization.', 'Bisect performs a binary search through history to find the first bad commit. Clean removes untracked files; always dry-run and use only in a disposable lab.', 'Worktrees check out multiple branches, sparse/partial/shallow clones reduce local content/history, and submodules/subtree connect repositories. These solve specialist problems and require project-specific guidance.'],
        steps: [
          { title: 'Compare merge and rebase', body: 'Draw both results from the same graph. Note that merge preserves original commits while rebase creates new commit identities.' },
          { title: 'Cherry-pick deliberately', body: 'In a disposable lab, switch to the target branch, confirm clean status, inspect the source commit, apply that one commit, and inspect its new hash.' },
          { title: 'Handle a conflict', body: 'Resolve and test intended content, stage it, then continue. If the selected commit or target was wrong, abort before completion.' },
          { title: 'Bisect a prepared defect', body: 'Mark a known good and bad commit, test the midpoint Git selects, repeat, then reset bisect state.' },
          { title: 'Dry-run clean', body: 'Create disposable untracked files, run git clean -n, read every listed path, and do not perform deletion in the capstone.' },
          { title: 'Recognize project-scale tools', body: 'Read project documentation before using LFS, worktrees, submodules, subtree, sparse checkout, or history filters.' }
        ],
        commands: [
          cmd('Apply one inspected commit', { powershell: 'git status\ngit show <source-commit>\ngit cherry-pick <source-commit>', cmd: 'git status\ngit show <source-commit>\ngit cherry-pick <source-commit>', gitbash: 'git status\ngit show <source-commit>\ngit cherry-pick <source-commit>', zsh: 'git status\ngit show <source-commit>\ngit cherry-pick <source-commit>', bash: 'git status\ngit show <source-commit>\ngit cherry-pick <source-commit>' }, 'Replace the placeholder after verifying the target branch and source. Cherry-pick creates a new commit with a new hash.'),
          cmd('Continue or abandon a conflicted cherry-pick', { powershell: 'git add <resolved-file>\ngit cherry-pick --continue\n# Or before completion:\ngit cherry-pick --abort', cmd: 'git add <resolved-file>\ngit cherry-pick --continue\nREM Or before completion:\ngit cherry-pick --abort', gitbash: 'git add <resolved-file>\ngit cherry-pick --continue\n# Or before completion:\ngit cherry-pick --abort', zsh: 'git add <resolved-file>\ngit cherry-pick --continue\n# Or before completion:\ngit cherry-pick --abort', bash: 'git add <resolved-file>\ngit cherry-pick --continue\n# Or before completion:\ngit cherry-pick --abort' }, 'Continue only after resolution and testing. Abort returns to the pre-operation state when possible.'),
          cmd('Preview untracked deletion only', { powershell: 'git clean -n', cmd: 'git clean -n', gitbash: 'git clean -n', zsh: 'git clean -n', bash: 'git clean -n' }, '-n is a dry run. This lesson does not run the deleting form in a real project.'),
          cmd('Begin and finish a bisect lab', { powershell: 'git bisect start\ngit bisect bad\ngit bisect good <known-good-hash>\n# Test each selected commit, mark good or bad\ngit bisect reset', cmd: 'git bisect start\ngit bisect bad\ngit bisect good <known-good-hash>\nREM Test each selected commit, mark good or bad\ngit bisect reset', gitbash: 'git bisect start\ngit bisect bad\ngit bisect good <known-good-hash>\n# Test each selected commit, mark good or bad\ngit bisect reset', zsh: 'git bisect start\ngit bisect bad\ngit bisect good <known-good-hash>\n# Test each selected commit, mark good or bad\ngit bisect reset', bash: 'git bisect start\ngit bisect bad\ngit bisect good <known-good-hash>\n# Test each selected commit, mark good or bad\ngit bisect reset' }, 'Use only in the prepared lab. Replace the hash and mark each tested midpoint.')
        ],
        expected: 'You can select the ordinary merge workflow by default and identify when specialist commands require team/project guidance.',
        practice: 'Backport one prepared fix to a practice maintenance branch with cherry-pick, compare original and new hashes, and explain why normal synchronization still uses merge or team-approved rebase.',
        mistakes: [mistake('Published commits changed after rebase and push.', 'Shared history was rewritten without coordination.', 'Stop further pushes, notify collaborators, inspect local/remote graphs, and follow the team’s recovery plan. Do not stack more force pushes.')],
        visual: { type: 'split', title: 'Merge versus rebase', nodes: ['Merge: original commits + merge commit', 'Rebase: copied commits with new hashes', 'Team policy decides'], alt: 'Merge preserves the original divergent commits, while rebase copies commits with new identities onto another base.' },
        quiz: q('What must happen before using git clean to remove files?', ['Run a dry run and inspect every path', 'Force push', 'Delete .git'], 0, 'git clean -n previews candidates and prevents blind deletion.', 'Preview destructive scope first.', 'Does rebase preserve commit hashes?')
      }),
      L({
        id: 'troubleshooting', title: 'Troubleshoot Git methodically', duration: 35,
        outcome: 'Capture evidence, diagnose common errors, and select the least destructive recovery.',
        prerequisites: ['fetch-pull-push', 'inspect-recover'], terms: ['repository', 'branch'],
        explanation: ['Before changing anything, record the exact command, current folder, shell, full error, status, current branch, graph, and remotes. Error text is evidence.', 'Common causes include wrong folder, wrong shell, misspelled/case-mismatched paths, unfinished merge/rebase, missing identity, authentication, permissions, stale remote state, ignored files, or line-ending noise.', 'Do not copy a destructive fix from a search result without mapping it to your state. Create a backup branch or filesystem copy before advanced history repair.'],
        steps: [
          { title: 'Capture context', body: 'Record location, shell, command, complete error, git version, and whether the problem reproduces.' },
          { title: 'Inspect repository state', body: 'Run status, branch show-current, remote -v, and decorated graph. Do not run changing commands yet.' },
          { title: 'Classify the error', body: 'Determine whether it concerns location, file state, history relationship, authentication/authorization, or an operation already in progress.' },
          { title: 'Choose the smallest recovery', body: 'Correct the path/config, finish or abort the operation, fetch and integrate, or request permission as appropriate.' },
          { title: 'Verify the result', body: 'Repeat the original goal, run tests, inspect status and graph, and record what resolved it.' }
        ],
        commands: [cmd('Collect a safe diagnostic snapshot', { powershell: 'Get-Location\ngit --version\ngit status\ngit branch --show-current\ngit remote -v\ngit log --oneline --graph --decorate --all -10', cmd: 'cd\ngit --version\ngit status\ngit branch --show-current\ngit remote -v\ngit log --oneline --graph --decorate --all -10', gitbash: 'pwd\ngit --version\ngit status\ngit branch --show-current\ngit remote -v\ngit log --oneline --graph --decorate --all -10', zsh: 'pwd\ngit --version\ngit status\ngit branch --show-current\ngit remote -v\ngit log --oneline --graph --decorate --all -10', bash: 'pwd\ngit --version\ngit status\ngit branch --show-current\ngit remote -v\ngit log --oneline --graph --decorate --all -10' }, 'These commands inspect context without changing repository history. Review output for secrets before sharing it.')],
        expected: 'You can produce a diagnostic report and explain the selected recovery in terms of observed state.',
        practice: 'Diagnose prepared examples: not a repository, ignored file, rejected push, detached HEAD, and unfinished merge.',
        mistakes: [mistake('A copied “fix” made the state harder to understand.', 'Commands were applied before evidence was captured.', 'Stop, preserve current evidence, create a backup when safe, and ask for review using the exact before/after commands and output.')],
        visual: { type: 'decision', title: 'Troubleshooting loop', nodes: ['Capture exact evidence', 'Classify state', 'Choose smallest action', 'Verify original goal', 'Document result'], alt: 'Troubleshooting begins with evidence, classifies the state, applies the smallest justified action, verifies the goal, and documents the result.' },
        quiz: q('What should you do before applying a Git fix?', ['Capture exact state and error evidence', 'Delete .git', 'Try random commands'], 0, 'Evidence allows a recovery to match the real state and avoids compounding errors.', 'Diagnose before changing.', 'Which read-only commands help describe repository state?')
      })
    ]
  }
];

export const allLessons = course.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, moduleId: module.id, moduleTitle: module.title, moduleNumber: module.number })));
export const lessonById = new Map(allLessons.map((lesson) => [lesson.id, lesson]));

export const capstoneChecks = [
  { id: 'index', label: 'index.html exists at the deployment root' },
  { id: 'semantic', label: 'Page uses header, navigation, main, sections, and footer' },
  { id: 'title', label: 'Page has a descriptive title and one clear h1' },
  { id: 'responsive', label: 'Layout works at 320px, tablet, and desktop widths' },
  { id: 'keyboard', label: 'All interactive controls work by keyboard with visible focus' },
  { id: 'images', label: 'Images use exact-case relative paths, dimensions, and useful alt text' },
  { id: 'links', label: 'Internal and external links were tested publicly' },
  { id: 'console', label: 'Browser console has no unexplained errors' },
  { id: 'privacy', label: 'No passwords, tokens, private keys, .env values, or private personal data' },
  { id: 'readme', label: 'README explains purpose, live demo, projects, setup, accessibility, and license' },
  { id: 'history', label: 'Focused commits and at least one reviewed feature pull request exist' },
  { id: 'pages', label: 'GitHub Pages deployment succeeds and the public URL matches the tested commit' },
  { id: 'release', label: 'The verified production commit has an annotated v1.0.0 tag and release notes' },
  { id: 'maintenance', label: 'A later fix follows issue → branch → PR → deploy → verify → patch release' }
];
