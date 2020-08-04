function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = "";
    for (var i = 0; i < issues.length; i++) {
        var _a = issues[i], id = _a.id, desc = _a.description, severity = _a.severity, assignedTo = _a.assignedTo, status_1 = _a.status;
        issuesList.innerHTML += "<div class=\"well\"><h6>Issue ID: " + id + "</h6><p><span class=\"label label-info\">" + status_1 + "</span></p><h3>" + desc + "</h3><p><span class=\"glyphicon glyphicon-info-sign\"></span> " + severity + "<span class=\"glyphicon glyphicon-user\"></span> " + assignedTo + "</p><div class=\"btn-toolbar\"><a href=\"#\" class=\"btn btn-warning\" onclick=\"setStatusClosed('" + id + "')\">Close</a><a href=\"#\" class=\"btn btn-danger\" onclick=\"deleteIssue('" + id + "')\">Delete</a></div></div>";
    }
}
document.getElementById("issueInputForm").addEventListener('submit', saveIssue);
function saveIssue(e) {
    var issueId = chance.guid();
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = "Open";
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    };
    if (localStorage.getItem('issues') === null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    var form = document.getElementById("issueInputForm");
    form.reset();
    fetchIssues();
    e.preventDefault();
}
function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for (var _i = 0, issues_1 = issues; _i < issues_1.length; _i++) {
        var issue = issues_1[_i];
        if (issue.id == id) {
            issue.status = "Closed";
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}
function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}
