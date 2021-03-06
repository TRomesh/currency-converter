/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ConvertInputType: { // input type
    amount: number; // Float!
    codes?: string[] | null; // [String!]
  }
  DetailInputType: { // input type
    codes?: string[] | null; // [String!]
  }
  LoginInputType: { // input type
    password: string; // String!
    username: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  JSON: any
}

export interface NexusGenObjects {
  Conversion: { // root type
    conversion?: NexusGenScalars['JSON'] | null; // JSON
  }
  Country: { // root type
    cca2?: string | null; // String
    currencies?: NexusGenScalars['JSON'] | null; // JSON
    name?: NexusGenRootTypes['CountryName'] | null; // CountryName
    population?: number | null; // Int
    rates?: Array<NexusGenScalars['JSON'] | null> | null; // [JSON]
  }
  CountryList: { // root type
    cca2?: string | null; // String
    name?: NexusGenRootTypes['CountryName'] | null; // CountryName
  }
  CountryName: { // root type
    common?: string | null; // String
    official?: string | null; // String
  }
  LoginPayload: { // root type
    token?: string | null; // String
  }
  Mutation: {};
  Query: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Conversion: { // field return type
    conversion: NexusGenScalars['JSON'] | null; // JSON
  }
  Country: { // field return type
    cca2: string | null; // String
    common: string | null; // String
    currencies: NexusGenScalars['JSON'] | null; // JSON
    name: NexusGenRootTypes['CountryName'] | null; // CountryName
    official: string | null; // String
    population: number | null; // Int
    rates: Array<NexusGenScalars['JSON'] | null> | null; // [JSON]
  }
  CountryList: { // field return type
    cca2: string | null; // String
    common: string | null; // String
    name: NexusGenRootTypes['CountryName'] | null; // CountryName
  }
  CountryName: { // field return type
    common: string | null; // String
    official: string | null; // String
  }
  LoginPayload: { // field return type
    token: string | null; // String
  }
  Mutation: { // field return type
    convert: NexusGenRootTypes['Conversion']; // Conversion!
    country_details: Array<NexusGenRootTypes['Country'] | null>; // [Country]!
    login: NexusGenRootTypes['LoginPayload']; // LoginPayload!
  }
  Query: { // field return type
    country_list: Array<NexusGenRootTypes['CountryList'] | null>; // [CountryList]!
  }
}

export interface NexusGenFieldTypeNames {
  Conversion: { // field return type name
    conversion: 'JSON'
  }
  Country: { // field return type name
    cca2: 'String'
    common: 'String'
    currencies: 'JSON'
    name: 'CountryName'
    official: 'String'
    population: 'Int'
    rates: 'JSON'
  }
  CountryList: { // field return type name
    cca2: 'String'
    common: 'String'
    name: 'CountryName'
  }
  CountryName: { // field return type name
    common: 'String'
    official: 'String'
  }
  LoginPayload: { // field return type name
    token: 'String'
  }
  Mutation: { // field return type name
    convert: 'Conversion'
    country_details: 'Country'
    login: 'LoginPayload'
  }
  Query: { // field return type name
    country_list: 'CountryList'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    convert: { // args
      data?: NexusGenInputs['ConvertInputType'] | null; // ConvertInputType
    }
    country_details: { // args
      data?: NexusGenInputs['DetailInputType'] | null; // DetailInputType
    }
    login: { // args
      data?: NexusGenInputs['LoginInputType'] | null; // LoginInputType
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}