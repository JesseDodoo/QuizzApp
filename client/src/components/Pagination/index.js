import React from 'react'

const Pagination = ({scoresPerPage,totalScores, paginate }) => 
{

  const pageNumbers =[];

  for(let i = 1; i <= Math.ceil(totalScores/scoresPerPage); i++)
  {
    pageNumbers.push(i);
  }

  
  return (
    <section className='PaginationSection' >
        <div className='Pagination'>
          {pageNumbers.map( number => 
          (
            <div key={number} className="PagBtn" >
              <a onClick = {() => paginate(number)} className='page-link'>
                {number}
              </a>
            </div>
          ))}
        </div>
    </section>    
  )
}

export default Pagination