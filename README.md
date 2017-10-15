# reprap.io
An open source tool for effectively sharing and browsing of 3D printable objects 

# Goals
  *GitHub based

  *Fast & effective searching and browsing of 3D-printable objects & projects

  *Clean, modern UI


# Roadmap


__Specification for 'reprap.io' file:__

  *It's a blank file
  
  *Used to detect a repository to display on reprap.io


---


__Specification for 'reprap.io' 3D object GitHub repository:__

  *A repository containing an object to be displayed by reprap.io
  
  *Recommended files/folders structure:
  
    /documentation
    
    /stls
    
    /source
    
    readme.md
    
    reprap.io
   
   
---


__Backend:__

  *Go application using GitHub Search API to retrieve all repositories containing reprap.io file


---

__Frontend:__

  *Display & browse all data returned directly from GitHub similar to http://stl.garden
  
  
  
  
