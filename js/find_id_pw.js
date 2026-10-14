  const domain=document.querySelector('.domain');
  const domainSpace=document.querySelector('.domain_space');
  domain.addEventListener('change',()=>{
    domainSpace.value=domain.value;
  })
/* --------- domain ---------- */