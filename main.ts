
function fetchIssues() : void {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = "";

    for (let i = 0; i < issues.length; i++) {
        const {id, description: desc, severity, assignedTo, status } = issues[i];
        issuesList.innerHTML += `<div class="well"><h6>Issue ID: ${id}</h6><p><span class="label label-info">${status}</span></p><h3>${desc}</h3><p><span class="glyphicon glyphicon-info-sign"></span> ${severity}<span class="glyphicon glyphicon-user"></span> ${assignedTo}</p><div class="btn-toolbar"><a href="#" class="btn btn-warning" onclick="setStatusClosed('${id}')">Close</a><a href="#" class="btn btn-danger" onclick="deleteIssue('${id}')">Delete</a></div></div>`;
    }
}

document.getElementById("issueInputForm").addEventListener('submit', saveIssue);

function saveIssue(e: Event) : void {
    let issueId = chance.guid();
    let issueDesc = (<HTMLFormElement>document.getElementById('issueDescInput')).value;
    let issueSeverity = (<HTMLFormElement>document.getElementById('issueSeverityInput')).value;
    let issueAssignedTo = (<HTMLFormElement>document.getElementById('issueAssignedToInput')).value;
    let issueStatus = "Open";

    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    let form = <HTMLFormElement>document.getElementById("issueInputForm");
    form.reset();

    fetchIssues();
    e.preventDefault();
}

function setStatusClosed(id: string) : void {
    let issues = JSON.parse(localStorage.getItem('issues'));
    for (let issue of issues) {
        if (issue.id == id) {
            issue.status = "Closed";
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id: string) : void {
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}