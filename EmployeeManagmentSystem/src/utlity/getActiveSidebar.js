 function getActiveSidebar(pathname, isAdmin) {
  if (pathname === "/admin" || pathname === "/employee") {
    return 1;
  } else if (pathname === "/user" && isAdmin) {
    return 2;
  } else if (pathname === "/hk" && isAdmin) {
    return 3;
  } else if (pathname.startsWith("/task")) {
    return 4;
  } else if (
    pathname.startsWith("/admin/leavehistory") ||
    pathname.startsWith("/leavehistory")
  ) {
    return 5;
  } else if (
    pathname === "/addsalary" ||
    pathname.startsWith("/salaryhistory")
  ) {
    return 6;
  } else if (pathname.startsWith("/attendenceHistory/")) {
    return 7;
  } else if(pathname === "/setting") {
    return 8; 
  }else{
    return null
  }
}

export default getActiveSidebar
