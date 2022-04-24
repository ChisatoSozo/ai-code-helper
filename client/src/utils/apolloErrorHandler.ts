export const apolloErrorHandler = (error:any) => {
  if(error?.networkError?.result?.errors){
    for (const specificError of error.networkError.result.errors) {
      console.log(specificError.message);
    }
  }
};