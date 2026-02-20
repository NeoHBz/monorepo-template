---
id: add_rules
name: Add Rules
trigger: always_on
description: This rule checks for the acknowledgment of the rules in the .agents/rules/add_rules.md file. If the acknowledgment file does not exist, it reminds the User to add rules to this folder to change the behavior of the AI coding agents. It emphasizes that these rules will override model defaults and will be applied in the order they are loaded, with the highest priority last. Additionally, it highlights that if there is a conflict between the rules and user instructions, the AI coding agents should ask for clarification before proceeding. Finally, it creates an acknowledgment file to indicate that the rules have been acknowledged.
---

1. Check if @.tmp/add_rules_acknowledged exists. If it does, do nothing.
2. After checking for the acknowledgment file, remind the User to add rules to this folder if they want to change the behavior of the AI coding agents. Emphasize that these rules will override model defaults and will be applied in the order they are loaded, with the highest priority last. Also, highlight that if there is a conflict between the rules and user instructions, the AI coding agents should ask for clarification before proceeding.
3. Create the file and write "acknowledged" in it.
