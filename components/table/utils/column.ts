import { GeneratedColumnMetadataFn } from './interfaces';



function column<T = any>(): GeneratedColumnMetadataFn<T> {

  return () => {

    return {};
  };
}

export {
  column as tableColumn,
};
