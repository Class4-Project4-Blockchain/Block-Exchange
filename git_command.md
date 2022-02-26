# git 명령어

로컬에 브랜치 생성하기  
git branch 브랜치명  

한 브랜치에서 새로 브랜치 분기해서 생성하기   
git branch 생성할브랜치명 분기해나올브랜치명  

로컬의 브랜치 삭제하기  
git branch -d 브랜치명  

로컬 내에서 브랜치 이동   
git checkout  

로컬에 브랜치 생성하며 동시에 이동  
git checkout -b 

원격의 브랜치를 로컬에 받기  
git pull origin 원격브랜치명  


==============테스트==============
220226_whkwon dev to main test
220226_whkwon feature to dev test
220226_chlee fork
220226 kwh is stupid
220226 jts nagara
220226_asj
220226_cmg
    - 항상 작업 전에는 터미널에 git pull origin dev 를 사용하여 다른 작업자의 작업내용을 확인한 후
    - 작업하여야 줄겹침에 대한 이슈를 피하기 좋다.