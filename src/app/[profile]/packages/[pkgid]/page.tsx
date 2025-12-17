'use client'

import { useParams } from 'next/navigation'

const PackageDetails = () => {
  const params = useParams()
  const packageId = params.pkgid

  console.log(params);
  console.log(packageId);
  
  
  return (
    <div>PackageDetails</div>
  )
}

export default PackageDetails