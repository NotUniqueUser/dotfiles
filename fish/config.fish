if status is-interactive
    alias ls='eza --hyperlink --color=always --group-directories-first --icons'
    alias ll='eza --hyperlink -la --icons --octal-permissions --group-directories-first'

    set -Ux PYENV_ROOT $HOME/.pyenv
    test -d $PYENV_ROOT/bin; and fish_add_path $PYENV_ROOT/bin
end

set EDITOR nvim

pyenv init - fish | source

function fish_greeting

end

# Start hyprland
if uwsm check may-start

    exec uwsm start hyprland.desktop
end

fish_add_path ~/.spicetify
