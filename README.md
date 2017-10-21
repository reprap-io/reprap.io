# reprap.io
An open source tool for effectively sharing and browsing 3D printable objects 

# Goals
  *GitHub based

  *Fast & effective searching and browsing of 3D-printable objects & projects

  *Clean, modern UI


# Roadmap


__Specification for 'reprap.io' file:__

  *YAML file containing reprap.io generated GUID
  
  *Used to detect a repository to display on reprap.io
  
  *Used to determine how to display a repository on reprap.io


---


__Specification for 'reprap.io' 3D object GitHub repository:__

  *A repository containing an object to be displayed by reprap.io
  
  *Recommended files/folders structure:
  
    /doc
        
    /src
    
    readme.md
    
    reprap.io
   
  
   
---


__Backend:__

  */list
  Retrieves all active reprap.io objects found on github
  
  */new
  Outputs a new reprap.io YAML file containing a GUID.  We write the GUID to the database so we can find it on GitHub after it
  has been committed.
  
  */scan
  Periodically look at GitHub for reprap.io files we have generated, using the GUID to find them.
  When one is found, record it to the 'alive' repositories table.
  
  */search (?? if needed ??)
  Maybe we full-text index each GitHub repository name/description/readme.md into Elasticsearch when it becomes active
  This way we could do better than GitHub search, which does not have as forgiving full-text style search.
 


---

__Frontend:__

  *Display data returned directly from GitHub similar to http://stl.garden, using in browser STL render
  
  *Search GitHub directly similar to http://olegsmetanin.github.io/react_react-router_flummox_example/#/search/golang
  
  *Search for repositories containing reprap.io file, sorted by last modified / number of stars for "browsing"
  
  *Search <TERM> across all reprapio repo?? (backend??)
  
